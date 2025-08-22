import ScooterEntity from "@/src/home/entities/scooter.entity";
import { IStore } from "../../../app/store";
import RideEntity from "../../entities/ride.entity";

export default class RidePresenter {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  isLoading(): boolean {
    return this.store.ride.isLoading;
  }

  isSuccess(): boolean {
    return this.store.ride.isSuccess;
  }

  getErrorMessage(): string {
    return this.store.ride.errorMessage;
  }

  getCurrentRide(): RideEntity {
    return this.store.ride.currentRide;
  }

  getScooter(): ScooterEntity {
    return this.store.home.scooter;
  }

  getRideHistory(): RideEntity[] {
    return this.store.ride.rideHistory;
  }
}
