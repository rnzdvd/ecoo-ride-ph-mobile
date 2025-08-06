import { makeAutoObservable } from "mobx";

export default class HomeStore {
  constructor() {
    makeAutoObservable(this);
  }

  sqannedQRValue: string = "";
}
