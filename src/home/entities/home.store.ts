import { makeAutoObservable } from "mobx";
import ScooterEntity from "./scooter.entity";

export default class HomeStore {
  constructor() {
    makeAutoObservable(this);
  }

  sqannedQRValue: string = "";
  isLoading: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = "";
  selectedOption: string = "";
  scooters: ScooterEntity[] = [];
  scooter: ScooterEntity = new ScooterEntity();
}
