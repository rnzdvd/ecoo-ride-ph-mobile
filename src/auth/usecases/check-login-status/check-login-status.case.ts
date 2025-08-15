import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import AuthUserEntity from "../../entities/auth-user.entity";
import AuthRepository from "../../interfaces/gateways/auth.repository";

export default class CheckLoginStatusCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private storageRepo: StorageRepository
  ) {}

  async execute(): Promise<void> {
    const storedUser = await this.storageRepo.getItem(keys.authUser);

    if (storedUser) {
      this.authRepo.setIsLoggedIn(true);
      const authUser = AuthUserEntity.fromApiModel(JSON.parse(storedUser));
      this.authRepo.setAuthUser(authUser);
    } else {
      this.authRepo.setIsLoggedIn(false);
    }
  }
}
