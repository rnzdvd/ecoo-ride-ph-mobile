import { makeAutoObservable } from "mobx";
import BalanceEntity from "./balance.entity";
import CardEntity from "./card.entity";

export default class AccountStore {
  constructor() {
    makeAutoObservable(this);
  }

  balance: BalanceEntity = new BalanceEntity();
  cards: CardEntity[] = [];
  isSuccess: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  currentPaymentMethod: string = "GCASH";
  paymentUrl: string = "";
  threeDsUrl: string = "";
}
