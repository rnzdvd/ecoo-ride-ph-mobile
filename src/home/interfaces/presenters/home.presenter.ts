import { IStore } from "../../../app/store";

export default class HomePresenter {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  getScannedQRValue() {
    return this.store.home.sqannedQRValue;
  }

  isLoggedIn() {
    return this.store.auth.isLoggedIn;
  }

  getUserBalance() {
    return this.store.account.balance;
  }

  getScooters() {
    return this.store.home.scooters;
  }

  getScooter() {
    return this.store.home.scooter;
  }

  isSuccess() {
    return this.store.home.isSuccess;
  }

  isLoading() {
    return this.store.home.isLoading;
  }

  getCurrentRide() {
    return this.store.ride.currentRide;
  }

  getRideErrorMessage() {
    return this.store.ride.errorMessage;
  }
}
