import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import AccountRepository from "../../interfaces/gateways/account.repository";

export default class RemoveCardCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly accountRepo: AccountRepository
  ) {}

  async execute(id: number): Promise<void> {
    this.accountRepo.setIsLoading(true);

    const response = await this.apiGateway.removeCard(id.toString());
    console.log(response);
    if (codeStatusChecker(response.status_code)) {
      const cards = this.accountRepo.getCards();
      cards.splice(
        cards.findIndex((card) => card.id === id),
        1
      );
      this.accountRepo.setCards(cards);
      this.accountRepo.setIsSuccess(true);
    } else {
      this.accountRepo.setIsSuccess(false);
    }

    this.accountRepo.setIsLoading(false);
  }
}
