import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import HomeRepository from "@/src/home/interfaces/gateways/home.repository";
import { IStore } from "../../../app/store";
import ClearCurrentRideCase from "../../usecases/clear-current-ride/clear-current-ride.case";
import EndRideCase from "../../usecases/end-ride/end-ride.case";
import LoadRideHistoryCase from "../../usecases/load-ride-history/load-ride-history.case";
import StartRideCase from "../../usecases/start-ride/start-ride.case";
import RideRepository from "../gateways/ride.repository";

export default class RideController {
  private readonly store: IStore;
  private readonly startRideCase: StartRideCase;
  private readonly endRideCase: EndRideCase;
  private readonly clearCurrentRideCase: ClearCurrentRideCase;
  private readonly loadRideHistoryCase: LoadRideHistoryCase;

  constructor(store: IStore) {
    this.store = store;
    const apiGateway = new ApiGateway(store);
    const rideRepo = new RideRepository(store);
    const storageRepo = new StorageRepository();
    const homeRepo = new HomeRepository(store);
    this.startRideCase = new StartRideCase(apiGateway, rideRepo, storageRepo);
    this.endRideCase = new EndRideCase(
      apiGateway,
      rideRepo,
      storageRepo,
      homeRepo
    );
    this.clearCurrentRideCase = new ClearCurrentRideCase(
      rideRepo,
      homeRepo,
      storageRepo
    );
    this.loadRideHistoryCase = new LoadRideHistoryCase(
      apiGateway,
      rideRepo,
      homeRepo
    );
  }

  async startRide(): Promise<void> {
    await this.startRideCase.execute();
  }

  async endRide(): Promise<void> {
    await this.endRideCase.execute();
  }

  async clearCurrentRide(): Promise<void> {
    await this.clearCurrentRideCase.execute();
  }

  async loadRideHistory(): Promise<void> {
    await this.loadRideHistoryCase.execute();
  }
}
