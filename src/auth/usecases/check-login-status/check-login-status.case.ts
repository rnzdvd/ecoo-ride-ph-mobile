import { ILoginResponseModel } from "@/src/common/api/api-models";
import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { codeStatusChecker } from "@/src/common/utils";
import AuthUserEntity from "../../entities/auth-user.entity";
import AuthRepository from "../../interfaces/gateways/auth.repository";

export default class CheckLoginStatusCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly authRepo: AuthRepository,
    private storageRepo: StorageRepository
  ) {}

  async execute(): Promise<void> {
    const storedUser = await this.storageRepo.getItem(keys.authUser);

    // refresh the access token everytime user open the app to avoid premature token expiration
    if (storedUser) {
      this.authRepo.setIsLoggedIn(true);
      const parsedUser: ILoginResponseModel = JSON.parse(storedUser);
      const authUser = AuthUserEntity.fromApiModel(parsedUser);
      const response = await this.apiGateway.refreshToken(authUser.accessToken);

      if (codeStatusChecker(response.status_code)) {
        authUser.setAccessToken(response.access_token);
        parsedUser.access_token = response.access_token;
        await this.storageRepo.setItem(
          keys.authUser,
          JSON.stringify(parsedUser)
        );
      }
      this.authRepo.setAuthUser(authUser);
    } else {
      this.authRepo.setIsLoggedIn(false);
    }
  }
}
