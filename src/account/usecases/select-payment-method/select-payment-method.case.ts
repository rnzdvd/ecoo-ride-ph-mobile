import CardEntity from "../../entities/card.entity";
import EwalletEntity from "../../entities/ewallet.entity";
import AccountRepository from "../../interfaces/gateways/account.repository";

export default class SelectPaymentMethodCase {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(paymentMethod: EwalletEntity | CardEntity): Promise<void> {
    this.accountRepo.setCurrentPaymentMethod(paymentMethod);
  }
}
