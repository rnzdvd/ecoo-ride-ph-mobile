import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import CardEntity from "../../entities/card.entity";
import EwalletEntity from "../../entities/ewallet.entity";
import AccountRepository from "../../interfaces/gateways/account.repository";

export default class RequestPaymentCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly accountRepo: AccountRepository
  ) {}

  async execute(amount: number): Promise<void> {
    this.accountRepo.setIsLoading(true);

    const paymentMethod = this.accountRepo.getCurrentPaymentMethod();

    const payload: {
      amount: number;
      channel_code: string;
      payment_token_id: string;
    } = {
      amount: 0,
      channel_code: "",
      payment_token_id: "",
    };

    if (paymentMethod instanceof EwalletEntity) {
      const ewallet = paymentMethod as EwalletEntity;
      payload.amount = amount;
      payload.channel_code = ewallet.id;
    } else if (paymentMethod instanceof CardEntity) {
      const card = paymentMethod as CardEntity;
      payload.amount = amount;
      payload.channel_code = "CARDS";
      payload.payment_token_id = card.paymentMethodId;
    }

    const response = await this.apiGateway.requestPayment(payload);

    if (codeStatusChecker(response.status_code)) {
      this.accountRepo.setIsSuccess(true);
      this.accountRepo.setPaymentUrl(response.data.actions[0].value);
    } else {
      this.accountRepo.setErrorMessage(
        "Something went wrong while requesting payment."
      );
      this.accountRepo.setIsSuccess(false);
    }

    this.accountRepo.setIsLoading(false);
  }
}
