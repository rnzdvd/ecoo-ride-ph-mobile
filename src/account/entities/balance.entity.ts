import { IAccountBalanceResponseModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { makeObservable, observable } from "mobx";

export default class BalanceEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      balance: observable,
      debt: observable,
    });
  }

  balance: number = 0;
  debt: number = 0;

  setFromApiModel(data: IAccountBalanceResponseModel): void {
    this.balance = data.balance;
    this.debt = data.debt;
  }
}
