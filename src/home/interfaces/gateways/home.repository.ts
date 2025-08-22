import { IStore } from "../../../app/store";
import ScooterEntity from "../../entities/scooter.entity";

export interface IHomeRepository {
  repo: () => void;
}

export default class HomeRepository {
  private readonly store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  setScannedQRValue(value: string) {
    this.store.home.sqannedQRValue = value;
  }

  setScooters(scooters: ScooterEntity[]) {
    this.store.home.scooters = scooters;
  }

  setScooter(scooter: ScooterEntity) {
    this.store.home.scooter = scooter;
  }

  setIsLoading(isSuccess: boolean) {
    this.store.home.isLoading = isSuccess;
  }

  setIsSuccess(isSuccess: boolean) {
    this.store.home.isSuccess = isSuccess;
  }

  setErrorMessage(errorMessage: string) {
    this.store.home.errorMessage = errorMessage;
  }

  getScannedQRValue() {
    return this.store.home.sqannedQRValue;
  }

  getSelectedOption() {
    return this.store.home.selectedOption;
  }

  setSelectedOption(selectedOption: string) {
    this.store.home.selectedOption = selectedOption;
  }

  getScooters() {
    return this.store.home.scooters;
  }
}
