import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import AuthRepository from "../../interfaces/gateways/auth.repository";

export default class RequestOtpCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly authRepo: AuthRepository
  ) {}

  async execute(email: string): Promise<void> {
    this.authRepo.setIsLoading(true);

    const response = await this.apiGateway.requestOtp(email);
    console.log(response);
    this.authRepo.setIsSuccess(codeStatusChecker(response.status_code));
    this.authRepo.setEmailRegistered(email);

    this.authRepo.setIsLoading(false);
  }
}
