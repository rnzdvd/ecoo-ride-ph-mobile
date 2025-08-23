import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { codeStatusChecker } from "@/src/common/utils";
import AuthUserEntity from "../../entities/auth-user.entity";
import AuthRepository from "../../interfaces/gateways/auth.repository";
export default class LogoutCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly authRepo: AuthRepository,
    private readonly storageRepo: StorageRepository
  ) {}

  delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async execute(): Promise<void> {
    this.authRepo.setIsLoading(true);
    await this.delay(1000);
    const response = await this.apiGateway.logout();
    if (codeStatusChecker(response.status_code)) {
      this.authRepo.setIsLoggedIn(false);
      this.authRepo.setAuthUser(new AuthUserEntity());
      this.authRepo.setIsSessionExpired(false);
      await this.storageRepo.removeItem(keys.authUser);
    }

    this.authRepo.setIsLoading(false);
  }
}
