import { makeAutoObservable } from "mobx";

export default class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoggedIn: boolean = false;
  emailRegistered: string = "";
}
