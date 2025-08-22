import ScooterEntity from "@/src/home/entities/scooter.entity";
import { IStore } from "../../../app/store";
import RideEntity from "../../entities/ride.entity";

export default class RideRepository {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  getSelectedOption(): string {
    return this.store.home.selectedOption;
  }

  getScooter(): ScooterEntity {
    return this.store.home.scooter;
  }

  setIsLoading(isSuccess: boolean) {
    this.store.ride.isLoading = isSuccess;
  }

  setIsSuccess(isSuccess: boolean) {
    this.store.ride.isSuccess = isSuccess;
  }

  setErrorMessage(errorMessage: string) {
    this.store.ride.errorMessage = errorMessage;
  }

  setCurrentRide(currentRide: RideEntity) {
    this.store.ride.currentRide = currentRide;
  }

  getCurrentRide(): RideEntity {
    return this.store.ride.currentRide;
  }

  setRideHistory(rideHistory: RideEntity[]) {
    this.store.ride.rideHistory = rideHistory;
  }
}
