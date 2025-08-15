import ApiGateway from "@/src/common/gateways/api.gateway";
import { IStore } from "../../../app/store";
import LoadBalanceCase from "../../usecases/load-balance/load-balance.case";
import AccountRepository from "../gateways/account.repository";

export default class AccountController {
  private readonly store: IStore;
  private readonly loadBalanceCase: LoadBalanceCase;
  constructor(store: IStore) {
    this.store = store;

    const apiGateway = new ApiGateway(store);
    const accountRepo = new AccountRepository(store);
    this.loadBalanceCase = new LoadBalanceCase(apiGateway, accountRepo);
  }

  async loadBalance(): Promise<void> {
    await this.loadBalanceCase.execute();
  }
}
