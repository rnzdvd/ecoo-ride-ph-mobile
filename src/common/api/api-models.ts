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

export interface IRideDetailsModel {
  id: number;
  user_id: number;
  scooter_id: string;
  started_at: string;
  billed_intervals: number;
  status: string;
  option: string;
  total_distance: number;
  total_charged: number;
  total_duration?: number;
  ended_at?: string;
  scooter_name?: string;
}

export interface IRideDetailsResponseModel {
  message: string;
  ride: IRideDetailsModel;
}

export interface IRequestPaymentResponseModel {
  actions: IPaymentActions[];
}

export interface IPaymentActions {
  value: string;
}

export interface ICardDetailsPayloadModel {
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvn: string;
  cardholder_first_name: string;
  cardholder_last_name: string;
  cardholder_email: string;
  cardholder_phone_number: string;
  payment_session_id: string;
  device: {
    fingerprint: string;
  };
}

export interface ICardListResponseModel {
  id: number;
  cardholder_first_name: string;
  cardholder_last_name: string;
  cardholder_email: string;
  cardholder_phone_number: string;
  network: string;
  type: string;
  payment_method_id: string;
  last_4: string;
  expiry_date: string;
}
