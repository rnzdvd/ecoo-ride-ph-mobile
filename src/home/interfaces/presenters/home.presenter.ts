import { IStore } from "../../../app/store";

export default class HomePresenter {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  getScannedQRValue() {
    return this.store.home.sqannedQRValue;
  }
}
