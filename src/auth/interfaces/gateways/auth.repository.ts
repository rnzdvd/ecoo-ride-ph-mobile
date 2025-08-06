import { IStore } from "../../../app/store";

export default class AuthRepository {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  setEmailRegistered(email: string) {
    this.store.auth.emailRegistered = email;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.store.auth.isLoggedIn = isLoggedIn;
  }
}
