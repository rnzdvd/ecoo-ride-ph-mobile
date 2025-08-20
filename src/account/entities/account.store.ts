import { makeAutoObservable } from "mobx";
import BalanceEntity from "./balance.entity";

export default class AccountStore {
  constructor() {
    makeAutoObservable(this);
  }

  balance: BalanceEntity = new BalanceEntity();
  isSuccess: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  currentPaymentMethod: string = "GCASH";
  paymentUrl: string = "";
}
