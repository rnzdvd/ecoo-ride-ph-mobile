import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker, delay } from "@/src/common/utils";
import CardEntity from "../../entities/card.entity";
import AccountRepository from "../../interfaces/gateways/account.repository";

export default class LoadCardsCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly accountRepo: AccountRepository
  ) {}

  async execute(withDelay: boolean = false): Promise<void> {
    this.accountRepo.setIsLoading(true);

    if (withDelay) {
      await delay(5000);
    }

    const response = await this.apiGateway.getCardList();

    if (codeStatusChecker(response.status_code)) {
      const cards = CardEntity.fromManyApiModels(response.data);
      this.accountRepo.setCards(cards);
    }

    this.accountRepo.setIsLoading(false);
  }
}
