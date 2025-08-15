import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { registerForPushNotificationsAsync } from "@/src/common/notification-services";
import { codeStatusChecker } from "@/src/common/utils";
import AuthUserEntity from "../../entities/auth-user.entity";
import AuthRepository from "../../interfaces/gateways/auth.repository";

export default class ConfirmOtpCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly authRepo: AuthRepository,
    private readonly storageRepo: StorageRepository
  ) {}

  async execute(otp: string): Promise<void> {
    this.authRepo.setIsLoading(true);
    this.authRepo.setIsLoggedIn(false);
    const registeredEmail = this.authRepo.getEmailRegistered();

    const response = await this.apiGateway.confirmOtp({
      email: registeredEmail,
      otp: otp,
    });

    if (codeStatusChecker(response.status_code)) {
      this.authRepo.setIsSuccess(true);

      const ifExists = await this.apiGateway.checkUserIfExists(registeredEmail);

      // if exists, login and direct to home screen
      if (codeStatusChecker(ifExists.status_code)) {
        if (ifExists.data.exist) {
          const token = await registerForPushNotificationsAsync();
          const loginViaEmailResponse = await this.apiGateway.loginViaEmail({
            email: registeredEmail,
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
        }
      }
    } else {
      this.authRepo.setIsSuccess(false);
      this.authRepo.setErrorMessage(response.data.message);
    }
    this.authRepo.setIsLoading(false);
  }
}
