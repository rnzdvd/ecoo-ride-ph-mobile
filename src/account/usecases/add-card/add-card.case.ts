import AuthRepository from "@/src/auth/interfaces/gateways/auth.repository";
import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import AccountRepository from "../../interfaces/gateways/account.repository";
import { ICardFormModel } from "../../ui/add-card/add-card.view";

export default class AddCardCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly accountRepo: AccountRepository,
    private readonly authRepo: AuthRepository
  ) {}

  async execute(card: ICardFormModel, fingerprint: string): Promise<void> {
    this.accountRepo.setIsLoading(true);

    const authUser = this.authRepo.getAuthUser();
    const generateSessionIdResponse = await this.apiGateway.generateSessionId();
    if (codeStatusChecker(generateSessionIdResponse.status_code)) {
      const sessionId = generateSessionIdResponse.data.session_id;

      const response = await this.apiGateway.addCardAttempt({
        card_number: card.card_number.replace(/\s+/g, ""),
        expiry_month: card.expiry_date.split("/")[0],
        expiry_year: `20${card.expiry_date.split("/")[1]}`,
        cvn: card.cvv,
        cardholder_first_name: card.card_holder_first_name,
        cardholder_last_name: card.card_holder_last_name,
        cardholder_email: authUser.email,
        cardholder_phone_number: authUser.phoneNumber,
        payment_session_id: sessionId,
        device: {
          fingerprint: fingerprint,
        },
      });

      if (
        codeStatusChecker(response.status_code) &&
        response.action_url !== "failed"
      ) {
        this.accountRepo.setIsSuccess(true);
        this.accountRepo.set3dsUrl(response.action_url);
        console.log(response.action_url);
      } else {
        this.accountRepo.setIsSuccess(false);
      }
    }

    this.accountRepo.setIsLoading(false);
  }
}
