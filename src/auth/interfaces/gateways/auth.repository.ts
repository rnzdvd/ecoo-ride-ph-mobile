import { IStore } from "../../../app/store";
import AuthUserEntity from "../../entities/auth-user.entity";

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

  setIsSuccess(isSuccess: boolean) {
    this.store.auth.isSuccess = isSuccess;
  }

  setAuthUser(authUser: AuthUserEntity) {
    this.store.auth.authUser = authUser;
  }

  setIsLoading(isLoading: boolean) {
    this.store.auth.isLoading = isLoading;
  }

  setErrorMessage(errorMessage: string) {
    this.store.auth.errorMessage = errorMessage;
  }

  getEmailRegistered(): string {
    return this.store.auth.emailRegistered;
  }

  getAuthUser(): AuthUserEntity {
    return this.store.auth.authUser;
  }

  setIsSessionExpired(isSessionExpired: boolean) {
    this.store.auth.isSessionExpired = isSessionExpired;
  }
}
