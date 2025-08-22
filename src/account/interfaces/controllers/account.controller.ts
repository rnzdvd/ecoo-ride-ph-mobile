import ApiGateway from "@/src/common/gateways/api.gateway";
import { IStore } from "../../../app/store";
import LoadBalanceCase from "../../usecases/load-balance/load-balance.case";
import RequestPaymentCase from "../../usecases/request-payment/request-payment.case";
import SelectPaymentMethodCase from "../../usecases/select-payment-method/select-payment-method.case";
import AccountRepository from "../gateways/account.repository";

export default class AccountController {
  private readonly store: IStore;
  private readonly loadBalanceCase: LoadBalanceCase;
  private readonly requestPaymentCase: RequestPaymentCase;
  private readonly selectPaymentMethodCase: SelectPaymentMethodCase;
  constructor(store: IStore) {
    this.store = store;

    const apiGateway = new ApiGateway(store);
    const accountRepo = new AccountRepository(store);
    this.loadBalanceCase = new LoadBalanceCase(apiGateway, accountRepo);
    this.requestPaymentCase = new RequestPaymentCase(apiGateway, accountRepo);
    this.selectPaymentMethodCase = new SelectPaymentMethodCase(accountRepo);
  }

  async loadBalance(): Promise<void> {
    await this.loadBalanceCase.execute();
  }

  async requestPayment(amount: number): Promise<void> {
    await this.requestPaymentCase.execute(amount);
  }

  async selectPaymentMethod(paymentMethod: string): Promise<void> {
    await this.selectPaymentMethodCase.execute(paymentMethod);
  }
}
