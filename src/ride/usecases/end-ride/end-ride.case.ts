import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { codeStatusChecker } from "@/src/common/utils";
import ScooterEntity from "@/src/home/entities/scooter.entity";
import HomeRepository from "@/src/home/interfaces/gateways/home.repository";
import RideEntity from "../../entities/ride.entity";
import RideRepository from "../../interfaces/gateways/ride.repository";

export default class EndRideCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly rideRepo: RideRepository,
    private readonly storageRepo: StorageRepository,
    private readonly homeRepo: HomeRepository
  ) {}

  async execute(): Promise<void> {
    this.rideRepo.setIsLoading(true);

    const ride = this.rideRepo.getCurrentRide();
    const response = await this.apiGateway.endRide({
      id: ride.id.toString(),
    });

    if (codeStatusChecker(response.status_code)) {
      this.rideRepo.setIsSuccess(true);
      this.rideRepo.setCurrentRide(new RideEntity());
      this.homeRepo.setScooter(new ScooterEntity());
      await this.storageRepo.removeItem(keys.rideId);
    }

    this.rideRepo.setIsLoading(false);
  }
}
