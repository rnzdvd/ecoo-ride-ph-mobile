import { IStore } from "../../../app/store";
import BalanceEntity from "../../entities/balance.entity";
import CardEntity from "../../entities/card.entity";

export default class AccountRepository {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  setBalance(balance: BalanceEntity): void {
    this.store.account.balance = balance;
  }

  setIsLoading(isLoading: boolean): void {
    this.store.account.isLoading = isLoading;
  }

  setIsSuccess(isSuccess: boolean): void {
    this.store.account.isSuccess = isSuccess;
  }

  setErrorMessage(errorMessage: string): void {
    this.store.account.errorMessage = errorMessage;
  }

  setPaymentUrl(paymentUrl: string): void {
    this.store.account.paymentUrl = paymentUrl;
  }

  getCurrentPaymentMethod(): string {
    return this.store.account.currentPaymentMethod;
  }

  setCurrentPaymentMethod(paymentMethod: string): void {
    this.store.account.currentPaymentMethod = paymentMethod;
  }

  set3dsUrl(threeDsUrl: string): void {
    this.store.account.threeDsUrl = threeDsUrl;
  }

  setCards(cards: CardEntity[]): void {
    this.store.account.cards = cards;
  }

  getCards(): CardEntity[] {
    return this.store.account.cards;
  }
}
