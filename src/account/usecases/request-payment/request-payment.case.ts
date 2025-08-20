import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import AccountRepository from "../../interfaces/gateways/account.repository";

export default class RequestPaymentCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly accountRepo: AccountRepository
  ) {}

  async execute(amount: number): Promise<void> {
    this.accountRepo.setIsLoading(true);

    const paymentMethod = this.accountRepo.getCurrentPaymentMethod();

    const response = await this.apiGateway.requestPayment({
      amount: amount,
      channel_code: paymentMethod,
    });

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
