import { IStore } from "@/src/app/store";
import { Api } from "../api/api";
import {
  IAccountBalanceResponseModel,
  ICardDetailsPayloadModel,
  ICardListResponseModel,
  ILoginResponseModel,
  IRegisterResponseModel,
  IRequestPaymentResponseModel,
  IRideDetailsModel,
  IRideDetailsResponseModel,
  IScooterResponseModel,
  IUserStatsResponseModel,
} from "../api/api-models";
import { BASE_URL, XENDIT_BASE_URL, XENDIT_PUBLIC_API_KEY } from "../config";

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
    return await this.post("api/register-user", {
      full_name: data.full_name,
      email: data.email,
      phone_number: `+63${data.phone_number}`,
    });
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

  async startRide(data: {
    scooter_id: string;
    option: string;
    curr_lat: number;
    curr_lng: number;
  }): Promise<{
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

  async generateSessionId(): Promise<{
    status_code: number;
    data: {
      session_id: string;
    };
  }> {
    return await this.post("api/generate-session-id");
  }

  async getCardList(): Promise<{
    status_code: number;
    data: ICardListResponseModel[];
  }> {
    return await this.get("api/get-user-cards");
  }

  async removeCard(id: string): Promise<{
    status_code: number;
  }> {
    return await this.post("api/remove-card", { id: id });
  }

  async getUserStats(): Promise<{
    status_code: number;
    data: IUserStatsResponseModel;
  }> {
    return await this.get("api/get-user-stats");
  }

  async getTotalDistanceById(id: string): Promise<{
    status_code: number;
    data: {
      total_distance: number;
    };
  }> {
    return await this.get(`api/get-total-distance-by-id?id=${id}`);
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

  async addCardAttempt(data: ICardDetailsPayloadModel): Promise<{
    status_code: number;
    action_url: string;
  }> {
    const token = btoa(`${XENDIT_PUBLIC_API_KEY}:`);

    const response = await fetch(XENDIT_BASE_URL + "payment_with_session", {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = (await response.json()) as {
        message: string;
        payment_token_id: string;
        action_url: string;
      };
      return {
        action_url: data.action_url,
        status_code: response.status,
      };
    } else {
      return {
        action_url: "failed",
        status_code: response.status,
      };
    }
  }
}
