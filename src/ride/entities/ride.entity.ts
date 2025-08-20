import { IRideDetailsResponseModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { makeObservable, observable } from "mobx";

export default class RideEntity extends BaseApiMappedEntity {
  constructor() {
    super();
    makeObservable(this, {
      id: observable,
      userId: observable,
      scooterId: observable,
      startedAt: observable,
      billedIntervals: observable,
      status: observable,
    });
  }

  id: number = -1;
  userId: number = -1;
  scooterId: string = "";
  startedAt: string = "";
  billedIntervals: number = 0;
  status: string = "";
  option: string = "";
  totalDistance: number = 0;
  totalCharged: number = 0;
  totalDuration: number = 0;
  setFromApiModel(data: IRideDetailsResponseModel): void {
    this.id = data.ride.id;
    this.userId = data.ride.user_id;
    this.scooterId = data.ride.scooter_id;
    this.startedAt = data.ride.started_at;
    this.billedIntervals = data.ride.billed_intervals;
    this.status = data.ride.status;
    this.option = data.ride.option;
    this.totalDistance = data.ride.total_distance;
    this.totalCharged = data.ride.total_charged;
    this.totalDuration = Math.ceil(data.ride.total_duration);
  }
}
