import { IStore } from "../../../app/store";
import BalanceEntity from "../../entities/balance.entity";
import CardEntity from "../../entities/card.entity";
import EwalletEntity from "../../entities/ewallet.entity";

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

  getCurrentPaymentMethod(): EwalletEntity | CardEntity {
    return this.store.account.currentPaymentMethod;
  }

  getPaymentUrl(): string {
    return this.store.account.paymentUrl;
  }

  get3dsUrl(): string {
    return this.store.account.threeDsUrl;
  }

  getCards(): CardEntity[] {
    return this.store.account.cards;
  }

  getPaymentMethods(): (EwalletEntity | CardEntity)[] {
    return this.store.account.paymentMethods;
  }
}
