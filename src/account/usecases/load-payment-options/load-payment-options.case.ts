import AccountRepository from "../../interfaces/gateways/account.repository";

export default class LoadPaymentOptionsCase {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(): Promise<void> {
    const cards = this.accountRepo.getCards();
    const ewallets = this.accountRepo.getEwallets();

    this.accountRepo.setPaymentMethods([...ewallets, ...cards]);
  }
}
