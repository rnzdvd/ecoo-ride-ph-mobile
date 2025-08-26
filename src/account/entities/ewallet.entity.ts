import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { makeObservable, observable } from "mobx";
import { IEwalletListResponseModel } from "../usecases/load-e-wallets/load-e-wallets.case";

export default class EwalletEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      id: observable,
      name: observable,
      percentageFee: observable,
      walletLogo: observable,
      fixedFee: observable,
    });
  }
  id: string = "";
  name: string = "";
  percentageFee: number = 0;
  fixedFee: number = 0;
  walletLogo: string = "";

  setFromApiModel(data: IEwalletListResponseModel): void {
    this.id = data.id;
    this.name = data.name;
    this.percentageFee = data.percentage_fee;
    this.walletLogo = data.wallet_logo;
    this.fixedFee = data.fixed_fee;
  }
}
