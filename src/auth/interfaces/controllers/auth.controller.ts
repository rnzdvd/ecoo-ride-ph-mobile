import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { IStore } from "../../../app/store";
import { IPersonalInformationFormModel } from "../../ui/personal-information/personal-information.view";
import CheckLoginStatusCase from "../../usecases/check-login-status/check-login-status.case";
import ConfirmOtpCase from "../../usecases/confirm-otp/confirm-otp.case";
import LoadUserStatsCase from "../../usecases/load-user-stats/load-user-stats.case";
import LogoutCase from "../../usecases/logout/logout.case";
import RegisterAccountCase from "../../usecases/register-account/register-account.case";
import RequestOtpCase from "../../usecases/request-otp/request-otp.case";
import AuthRepository from "../gateways/auth.repository";

export default class AuthController {
  private readonly store: IStore;
  private readonly registerAccountCase: RegisterAccountCase;
  private readonly requestOtpCase: RequestOtpCase;
  private readonly confirmOtpCase: ConfirmOtpCase;
  private readonly checkLoginStatusCase: CheckLoginStatusCase;
  private readonly logoutCase: LogoutCase;
  private readonly loadUserStatsCase: LoadUserStatsCase;
  constructor(store: IStore) {
    this.store = store;

    const authRepo = new AuthRepository(store);
    const apiGateway = new ApiGateway(store);
    const storageRepo = new StorageRepository();
    this.registerAccountCase = new RegisterAccountCase(
      apiGateway,
      authRepo,
      storageRepo
    );
    this.requestOtpCase = new RequestOtpCase(apiGateway, authRepo);
    this.confirmOtpCase = new ConfirmOtpCase(apiGateway, authRepo, storageRepo);
    this.checkLoginStatusCase = new CheckLoginStatusCase(
      apiGateway,
      authRepo,
      storageRepo
    );
    this.logoutCase = new LogoutCase(apiGateway, authRepo, storageRepo);
    this.loadUserStatsCase = new LoadUserStatsCase(apiGateway, authRepo);
  }

  async registerAccount(form: IPersonalInformationFormModel): Promise<void> {
    await this.registerAccountCase.execute(form);
  }

  async requestOtp(email: string): Promise<void> {
    await this.requestOtpCase.execute(email);
  }

  async confirmOtp(otp: string): Promise<void> {
    await this.confirmOtpCase.execute(otp);
  }

  async checkLoginStatus(): Promise<void> {
    await this.checkLoginStatusCase.execute();
  }

  async logout(): Promise<void> {
    await this.logoutCase.execute();
  }

  async loadUserStats(): Promise<void> {
    await this.loadUserStatsCase.execute();
  }
}
