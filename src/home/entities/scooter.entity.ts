import { IScooterResponseModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { makeObservable, observable } from "mobx";

export default class ScooterEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      id: observable,
      name: observable,
      status: observable,
      battery: observable,
      lat: observable,
      lng: observable,
    });
  }

  id: number = -1;
  name: string = "";
  status: string = "";
  battery: number = 0;
  lat: number = 0;
  lng: number = 0;

  setFromApiModel(data: IScooterResponseModel): void {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.battery = data.battery;
    this.lat = data.location.lat;
    this.lng = data.location.lng;
  }
}
