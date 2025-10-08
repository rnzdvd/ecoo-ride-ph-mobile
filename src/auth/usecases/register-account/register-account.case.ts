import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { registerForPushNotificationsAsync } from "@/src/common/notification-services";
import { codeStatusChecker } from "@/src/common/utils";
import AuthUserEntity from "../../entities/auth-user.entity";
import AuthRepository from "../../interfaces/gateways/auth.repository";
import { IPersonalInformationFormModel } from "../../ui/personal-information/personal-information.view";

export default class RegisterAccountCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly authRepo: AuthRepository,
    private readonly storageRepo: StorageRepository
  ) {}

  async execute(form: IPersonalInformationFormModel): Promise<void> {
    this.authRepo.setIsLoading(true);

    const response = await this.apiGateway.registerUser(form);

    if (codeStatusChecker(response.status_code)) {
      const token = await registerForPushNotificationsAsync();

      const loginViaEmailResponse = await this.apiGateway.loginViaEmail({
        email: form.email,
        deviceToken: token ?? "",
      });

      if (codeStatusChecker(loginViaEmailResponse.status_code)) {
        this.authRepo.setIsLoggedIn(true);
        const authEntity = AuthUserEntity.fromApiModel(
          loginViaEmailResponse.data.user
        );

        await this.storageRepo.setItem(
          keys.authUser,
          JSON.stringify(loginViaEmailResponse.data.user)
        );
        this.authRepo.setAuthUser(authEntity);
      } else {
        this.authRepo.setIsLoggedIn(false);
        const errorMessage = loginViaEmailResponse.data.message;
        this.authRepo.setErrorMessage(errorMessage ?? "Unknown Error");
      }
    } else {
      this.authRepo.setIsLoggedIn(false);
      const errorMessage = response.data.message;
      this.authRepo.setErrorMessage(errorMessage ?? "Unknown Error");
    }

    this.authRepo.setIsLoading(false);
  }
}
