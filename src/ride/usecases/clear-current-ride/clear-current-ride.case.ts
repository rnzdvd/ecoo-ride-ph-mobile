import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import ScooterEntity from "@/src/home/entities/scooter.entity";
import HomeRepository from "@/src/home/interfaces/gateways/home.repository";
import RideEntity from "../../entities/ride.entity";
import RideRepository from "../../interfaces/gateways/ride.repository";

export default class ClearCurrentRideCase {
  constructor(
    private readonly rideRepo: RideRepository,
    private readonly homeRepo: HomeRepository,
    private readonly storageRepo: StorageRepository
  ) {}

  async execute(): Promise<void> {
    this.rideRepo.setCurrentRide(new RideEntity());
    this.homeRepo.setScooter(new ScooterEntity());
    await this.storageRepo.removeItem(keys.rideId);
  }
}
