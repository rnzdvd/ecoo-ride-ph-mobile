import AuthRepository from "@/src/auth/interfaces/gateways/auth.repository";
import ApiGateway from "@/src/common/gateways/api.gateway";
import { IStore } from "../../../app/store";
import { ICardFormModel } from "../../ui/add-card/add-card.view";
import AddCardCase from "../../usecases/add-card/add-card.case";
import LoadBalanceCase from "../../usecases/load-balance/load-balance.case";
import LoadCardsCase from "../../usecases/load-cards/load-cards.case";
import RemoveCardCase from "../../usecases/remove-card/remove-card.case";
import RequestPaymentCase from "../../usecases/request-payment/request-payment.case";
import SelectPaymentMethodCase from "../../usecases/select-payment-method/select-payment-method.case";
import AccountRepository from "../gateways/account.repository";

export default class AccountController {
  private readonly store: IStore;
  private readonly loadBalanceCase: LoadBalanceCase;
  private readonly requestPaymentCase: RequestPaymentCase;
  private readonly selectPaymentMethodCase: SelectPaymentMethodCase;
  private readonly addCardCase: AddCardCase;
  private readonly loadCardsCase: LoadCardsCase;
  private readonly removeCardCase: RemoveCardCase;
  constructor(store: IStore) {
    this.store = store;

    const apiGateway = new ApiGateway(store);
    const accountRepo = new AccountRepository(store);
    const authRepo = new AuthRepository(store);
    this.loadBalanceCase = new LoadBalanceCase(apiGateway, accountRepo);
    this.requestPaymentCase = new RequestPaymentCase(apiGateway, accountRepo);
    this.selectPaymentMethodCase = new SelectPaymentMethodCase(accountRepo);
    this.addCardCase = new AddCardCase(apiGateway, accountRepo, authRepo);
    this.loadCardsCase = new LoadCardsCase(apiGateway, accountRepo);
    this.removeCardCase = new RemoveCardCase(apiGateway, accountRepo);
  }

  async loadBalance(withDelay: boolean = false): Promise<void> {
    await this.loadBalanceCase.execute(withDelay);
  }

  async requestPayment(amount: number): Promise<void> {
    await this.requestPaymentCase.execute(amount);
  }

  async selectPaymentMethod(paymentMethod: string): Promise<void> {
    await this.selectPaymentMethodCase.execute(paymentMethod);
  }

  async addCard(card: ICardFormModel, fingerprint: string): Promise<void> {
    await this.addCardCase.execute(card, fingerprint);
  }

  async loadCards(withDelay: boolean = false): Promise<void> {
    await this.loadCardsCase.execute(withDelay);
  }

  async removeCard(id: number): Promise<void> {
    await this.removeCardCase.execute(id);
  }
}
