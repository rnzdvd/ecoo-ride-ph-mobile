import { makeAutoObservable } from "mobx";
import BalanceEntity from "./balance.entity";
import CardEntity from "./card.entity";
import EwalletEntity from "./ewallet.entity";

export default class AccountStore {
  constructor() {
    makeAutoObservable(this);
  }

  balance: BalanceEntity = new BalanceEntity();
  cards: CardEntity[] = [];
  ewallets: EwalletEntity[] = [];
  paymentMethods: (EwalletEntity | CardEntity)[] = [];
  isSuccess: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  currentPaymentMethod: EwalletEntity | CardEntity = new EwalletEntity();
  paymentUrl: string = "";
  threeDsUrl: string = "";
}
