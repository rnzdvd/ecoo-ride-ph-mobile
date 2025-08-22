import AccountRepository from "../../interfaces/gateways/account.repository";

export default class SelectPaymentMethodCase {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(paymentMethod: string): Promise<void> {
    this.accountRepo.setCurrentPaymentMethod(paymentMethod);
  }
}
