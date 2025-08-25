import { ICardListResponseModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { makeObservable, observable } from "mobx";

export default class CardEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      id: observable,
      cardholderFirstName: observable,
      cardholderLastName: observable,
      cardholderEmail: observable,
      cardholderPhoneNumber: observable,
      network: observable,
      type: observable,
      paymentMethodId: observable,
      last4: observable,
    });
  }

  id: number = 0;
  cardholderFirstName: string = "";
  cardholderLastName: string = "";
  cardholderEmail: string = "";
  cardholderPhoneNumber: string = "";
  network: string = "";
  type: string = "";
  paymentMethodId: string = "";
  last4: string = "";
  expiryDate: string = "";

  setFromApiModel(data: ICardListResponseModel): void {
    this.id = data.id;
    this.cardholderFirstName = data.cardholder_first_name;
    this.cardholderLastName = data.cardholder_last_name;
    this.cardholderEmail = data.cardholder_email;
    this.cardholderPhoneNumber = data.cardholder_phone_number;
    this.network = data.network.toLowerCase();
    this.type = data.type;
    this.paymentMethodId = data.payment_method_id;
    this.last4 = data.last_4;
    this.expiryDate = data.expiry_date;
  }
}
