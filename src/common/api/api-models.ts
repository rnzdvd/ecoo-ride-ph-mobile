export interface ILoginResponseModel {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  total_distance: number;
  total_rides: number;
  access_token: string;
}

export interface IRegisterResponseModel {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  balance: number;
  message?: string;
}

export interface IAccountBalanceResponseModel {
  balance: number;
  debt: number;
}

export interface IScooterResponseModel {
  id: number;
  name: string;
  status: string;
  battery: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface IRideDetailsResponseModel {
  message: string;
  ride: {
    id: number;
    user_id: number;
    scooter_id: string;
    started_at: string;
    billed_intervals: number;
    status: string;
    option: string;
    total_distance: number;
    total_charged: number;
    total_duration: number;
  };
}

export interface IRequestPaymentResponseModel {
  actions: IPaymentActions[];
}

export interface IPaymentActions {
  value: string;
}
