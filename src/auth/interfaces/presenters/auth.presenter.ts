import { IStore } from "../../../app/store";

export default class AuthPresenter {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  getEmailRegistered(): string {
    return this.store.auth.emailRegistered;
  }

  isLoggedIn(): boolean {
    return this.store.auth.isLoggedIn;
  }
}
