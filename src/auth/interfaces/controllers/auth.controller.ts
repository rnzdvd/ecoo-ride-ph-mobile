import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { IStore } from "../../../app/store";
import { IRegistrationFormModel } from "../../ui/registration-phase-three/registration-phase-three.view";
import CheckLoginStatusCase from "../../usecases/check-login-status/check-login-status.case";
import ConfirmOtpCase from "../../usecases/confirm-otp/confirm-otp.case";
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
    this.logoutCase = new LogoutCase(authRepo, storageRepo);
  }

  async registerAccount(form: IRegistrationFormModel): Promise<void> {
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
}
