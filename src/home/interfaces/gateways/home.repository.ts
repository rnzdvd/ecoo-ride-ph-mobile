import { IStore } from "../../../app/store";

export interface IHomeRepository {
  repo: () => void;
}

export default class HomeRepository {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  setScannedQRValue(value: string) {
    this.store.home.sqannedQRValue = value;
  }
}
