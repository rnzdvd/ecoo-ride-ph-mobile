import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import BalanceEntity from "../../entities/balance.entity";
import AccountRepository from "../../interfaces/gateways/account.repository";

export default class LoadBalanceCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly accountRepo: AccountRepository
  ) {}

  async execute(): Promise<void> {
    this.accountRepo.setIsLoading(true);

    const response = await this.apiGateway.getBalance();

    if (codeStatusChecker(response.status_code)) {
      this.accountRepo.setBalance(BalanceEntity.fromApiModel(response.data));
    }

    this.accountRepo.setIsLoading(false);
  }
}
