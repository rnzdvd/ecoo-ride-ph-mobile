import { makeAutoObservable } from "mobx";
import RideEntity from "./ride.entity";

export default class RideStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = "";
  currentRide: RideEntity = new RideEntity();
}
