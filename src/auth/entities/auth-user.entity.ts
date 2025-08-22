import { ILoginResponseModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { action, makeObservable, observable } from "mobx";

export default class AuthUserEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      fullName: observable,
      email: observable,
      phoneNumber: observable,
      totalDistance: observable,
      totalRides: observable,
      accessToken: observable,
      setAccessToken: action,
    });
  }

  fullName: string = "";
  email: string = "";
  phoneNumber: string = "";
  totalDistance: number = 0;
  totalRides: number = 0;
  accessToken: string = "";

  setFromApiModel(data: ILoginResponseModel): void {
    this.fullName = data.full_name;
    this.email = data.email;
    this.phoneNumber = data.phone_number;
    this.totalDistance = data.total_distance;
    this.totalRides = data.total_rides;
    this.accessToken = data.access_token;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }
}
