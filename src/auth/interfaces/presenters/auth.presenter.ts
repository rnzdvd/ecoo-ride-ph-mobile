import { IStore } from "../../../app/store";
import AuthUserEntity from "../../entities/auth-user.entity";
import UserStatsEntity from "../../entities/user-stats.entity";

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

  isSuccess(): boolean {
    return this.store.auth.isSuccess;
  }

  isLoading(): boolean {
    return this.store.auth.isLoading;
  }

  getErrorMessage(): string {
    return this.store.auth.errorMessage;
  }

  getAuthUser(): AuthUserEntity {
    return this.store.auth.authUser;
  }

  isSessionExpired(): boolean {
    return this.store.auth.isSessionExpired;
  }

  getUserStats(): UserStatsEntity {
    return this.store.auth.userStats;
  }
}
