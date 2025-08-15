import { makeAutoObservable } from "mobx";
import AuthUserEntity from "./auth-user.entity";

export default class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoggedIn: boolean = false;
  isSuccess: boolean = false;
  isLoading: boolean = false;
  emailRegistered: string = "";
  errorMessage: string = "";
  authUser: AuthUserEntity = new AuthUserEntity();
}
