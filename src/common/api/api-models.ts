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
