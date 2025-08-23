import { IStore } from "@/src/app/store";
import { Api } from "../api/api";
import {
  IAccountBalanceResponseModel,
  ILoginResponseModel,
  IRegisterResponseModel,
  IRequestPaymentResponseModel,
  IRideDetailsModel,
  IRideDetailsResponseModel,
  IScooterResponseModel,
} from "../api/api-models";
import { BASE_URL } from "../config";

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

  async startRide(data: { scooter_id: string; option: string }): Promise<{
    status_code: number;
    data: IRideDetailsResponseModel;
  }> {
    return await this.post("api/start-ride", data);
  }

  async endRide(data: { id: string }): Promise<{
    status_code: number;
    data: {
      message: string;
      ride_id: number;
    };
  }> {
    return await this.post("api/end-ride", data);
  }

  async getRideById(id: string): Promise<{
    status_code: number;
    data: IRideDetailsResponseModel;
  }> {
    return await this.get(`api/get-ride?id=${id}`);
  }

  async requestPayment(data: {
    amount: number;
    channel_code: string;
  }): Promise<{
    status_code: number;
    data: IRequestPaymentResponseModel;
  }> {
    return await this.post("api/request-payment", data);
  }

  async getRideHistory(): Promise<{
    status_code: number;
    data: IRideDetailsModel[];
  }> {
    return await this.get("api/get-ride-history");
  }

  async logout(): Promise<{
    status_code: number;
    data: {
      message: string;
    };
  }> {
    return await this.post("api/logout");
  }

  async refreshToken(accessToken: string): Promise<{
    access_token: string;
    status_code: number;
  }> {
    const response = await fetch(BASE_URL + "api/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = (await response.json()) as {
        access_token: string;
      };
      return {
        access_token: data.access_token,
        status_code: response.status,
      };
    } else {
      return {
        access_token: accessToken,
        status_code: response.status,
      };
    }
  }
}
