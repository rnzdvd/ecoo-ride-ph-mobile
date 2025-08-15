import { IStore } from "@/src/app/store";
import { Api } from "../api/api";
import {
  IAccountBalanceResponseModel,
  ILoginResponseModel,
  IRegisterResponseModel,
  IScooterResponseModel,
} from "../api/api-models";

export default class ApiGateway extends Api {
  private readonly store: IStore;

  constructor(store: IStore) {
    super(store);
    this.store = store;
  }

  async loginViaEmail(data: { email: string; deviceToken: string }): Promise<{
    status_code: number;
    data: {
      user: ILoginResponseModel;
      message?: string;
    };
  }> {
    return await this.post("api/login-via-email", {
      email: data.email,
      device_token: data.deviceToken,
    });
  }

  async registerUser(data: {
    full_name: string;
    email: string;
    phone_number: string;
  }): Promise<{
    status_code: number;
    data: IRegisterResponseModel;
  }> {
    return await this.post("api/register-user", data);
  }

  async requestOtp(email: string): Promise<{
    status_code: number;
    data: {
      message: string;
    };
  }> {
    return await this.post("api/request-otp", { email: email });
  }

  async confirmOtp(data: { email: string; otp: string }): Promise<{
    status_code: number;
    data: {
      success: boolean;
      message: string;
    };
  }> {
    return await this.post("api/confirm-otp", data);
  }

  async checkUserIfExists(email: string): Promise<{
    status_code: number;
    data: {
      exist: boolean;
    };
  }> {
    return await this.post("api/check-user", { email: email });
  }

  async getBalance(): Promise<{
    status_code: number;
    data: IAccountBalanceResponseModel;
  }> {
    return await this.get("api/get-user-balance");
  }

  async getScooters(): Promise<{
    status_code: number;
    data: {
      data: IScooterResponseModel[];
    };
  }> {
    return await this.get("api/online-scooters");
  }

  async getScooterById(id: string): Promise<{
    status_code: number;
    data: IScooterResponseModel;
  }> {
    return await this.get(`api/scooter-details?id=${id}`);
  }
}
