import AccountRepository from "@/src/account/interfaces/gateways/account.repository";
import LoadBalanceCase from "@/src/account/usecases/load-balance/load-balance.case";
import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import RideRepository from "@/src/ride/interfaces/gateways/ride.repository";
import LoadOngoingRideCase from "@/src/ride/usecases/load-ongoing-ride/load-ongoing-ride.case";
import { IStore } from "../../../app/store";
import LoadScooterDetailsCase from "../../usecases/load-scooter-details/load-scooter-details.case";
import LoadScootersCase from "../../usecases/load-scooters/load-scooters.case";
import SetScannedQrCase from "../../usecases/set-scanned-qr/set-scanned-qr.case";
import SetSelectedOptionCase from "../../usecases/set-selected-option/set-selected-option.case";
import HomeRepository from "../gateways/home.repository";

export default class HomeController {
  private readonly store: IStore;
  private readonly setScannedQRCase: SetScannedQrCase;
  private readonly loadScootersCase: LoadScootersCase;
  private readonly loadAccountBalanceCase: LoadBalanceCase;
  private readonly loadScooterDetailsCase: LoadScooterDetailsCase;
  private readonly setSelectedOptionCase: SetSelectedOptionCase;
  private readonly loadOngoingRideCase: LoadOngoingRideCase;
  constructor(store: IStore) {
    this.store = store;
    const homeRepo = new HomeRepository(store);
    const accountRepo = new AccountRepository(store);
    const rideRepo = new RideRepository(store);
    const storageRepo = new StorageRepository();
    const apiGateway = new ApiGateway(store);
    this.setScannedQRCase = new SetScannedQrCase(homeRepo);
    this.loadScootersCase = new LoadScootersCase(apiGateway, homeRepo);
    this.loadAccountBalanceCase = new LoadBalanceCase(apiGateway, accountRepo);
    this.loadScooterDetailsCase = new LoadScooterDetailsCase(
      apiGateway,
      homeRepo
    );
    this.setSelectedOptionCase = new SetSelectedOptionCase(homeRepo);
    this.loadOngoingRideCase = new LoadOngoingRideCase(
      apiGateway,
      rideRepo,
      storageRepo,
      homeRepo
    );
  }

  setScannedQRValue(scannedQRValue: string): void {
    this.setScannedQRCase.execute(scannedQRValue);
  }

  setSelectedOption(selectedOption: string): void {
    this.setSelectedOptionCase.execute(selectedOption);
  }

  async loadScooters(): Promise<void> {
    await this.loadScootersCase.execute();
  }

  async loadAccountBalance(): Promise<void> {
    await this.loadAccountBalanceCase.execute();
  }

  async loadScooterDetails(): Promise<void> {
    await this.loadScooterDetailsCase.execute();
  }

  async loadOngoingRide(): Promise<void> {
    await this.loadOngoingRideCase.execute();
  }
}
