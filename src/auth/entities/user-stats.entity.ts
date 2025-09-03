import { IUserStatsResponseModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { makeObservable, observable } from "mobx";

export default class UserStatsEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      totalDistance: observable,
      totalRides: observable,
    });
  }

  totalRides: number = 0;
  totalDistance: number = 0;

  setFromApiModel(data: IUserStatsResponseModel): void {
    this.totalRides = data.total_rides;
    this.totalDistance = data.total_distance;
  }
}
