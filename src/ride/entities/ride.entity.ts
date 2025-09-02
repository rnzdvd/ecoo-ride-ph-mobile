import { IRideDetailsModel } from "@/src/common/api/api-models";
import BaseApiMappedEntity from "@/src/common/entities/base-api-mapped.entity";
import { getGapSeconds } from "@/src/common/utils";
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
      scooterName: observable,
    });
  }

  id: number = -1;
  scooterName: string = "";
  userId: number = -1;
  scooterId: string = "";
  startedAt: string = "";
  billedIntervals: number = 0;
  status: string = "";
  option: string = "";
  totalDistance: number = 0;
  totalCharged: number = 0;
  totalDuration: number = 0;

  setFromApiModel(data: IRideDetailsModel): void {
    this.id = data.id;
    this.userId = data.user_id;
    this.scooterId = data.scooter_id;
    this.startedAt = data.started_at;
    this.billedIntervals = data.billed_intervals;
    this.status = data.status;
    this.option = data.option;
    this.totalDistance = data.total_distance;
    this.totalCharged = data.total_charged;
    if (data.total_duration === 0) {
      this.totalDuration = Math.ceil(data.total_duration);
    } else {
      this.totalDuration = getGapSeconds(this.startedAt, data.ended_at);
    }
    if (data.scooter_name) {
      this.scooterName = data.scooter_name;
    }
  }
}
