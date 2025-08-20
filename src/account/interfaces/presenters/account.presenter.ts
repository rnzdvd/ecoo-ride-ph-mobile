import { IStore } from "../../../app/store";
import BalanceEntity from "../../entities/balance.entity";

export default class AccountPresenter {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  getBalance(): BalanceEntity {
    return this.store.account.balance;
  }

  isLoading(): boolean {
    return this.store.account.isLoading;
  }

  isSuccess(): boolean {
    return this.store.account.isSuccess;
  }

  getErrorMessage(): string {
    return this.store.account.errorMessage;
  }

  getCurrentPaymentMethod(): string {
    return this.store.account.currentPaymentMethod;
  }

  getPaymentUrl(): string {
    return this.store.account.paymentUrl;
  }
}
