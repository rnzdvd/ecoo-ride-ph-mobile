import { IStore } from "../../../app/store";
import RegisterAccountCase from "../../usecases/register-account/register-account.case";
import AuthRepository from "../gateways/auth.repository";

export default class AuthController {
  private readonly store: IStore;
  private readonly registerAccountCase: RegisterAccountCase;
  constructor(store: IStore) {
    this.store = store;

    const authRepo = new AuthRepository(store);
    this.registerAccountCase = new RegisterAccountCase(authRepo);
  }

  async registerAccount(): Promise<void> {
    await this.registerAccountCase.execute();
  }
}
