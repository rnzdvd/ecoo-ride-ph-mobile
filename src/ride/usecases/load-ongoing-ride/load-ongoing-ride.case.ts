import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { codeStatusChecker } from "@/src/common/utils";
import ScooterEntity from "@/src/home/entities/scooter.entity";
import HomeRepository from "@/src/home/interfaces/gateways/home.repository";
import RideEntity from "../../entities/ride.entity";
import RideRepository from "../../interfaces/gateways/ride.repository";

export default class LoadOngoingRideCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly rideRepo: RideRepository,
    private readonly storageRepo: StorageRepository,
    private readonly homeRepo: HomeRepository
  ) {}

  async execute(): Promise<void> {
    const rideId = await this.storageRepo.getItem(keys.rideId);

    if (rideId) {
      this.rideRepo.setIsLoading(true);
      const response = await this.apiGateway.getRideById(rideId);

      if (codeStatusChecker(response.status_code)) {
        if (response.data.ride.status === "active") {
          this.rideRepo.setIsSuccess(true);
          const rideEntity = RideEntity.fromApiModel(response.data.ride);
          this.rideRepo.setCurrentRide(rideEntity);

          const scooterResponse = await this.apiGateway.getScooterById(
            rideEntity.scooterId
          );

          if (codeStatusChecker(scooterResponse.status_code)) {
            const scooterEntity = ScooterEntity.fromApiModel(
              scooterResponse.data
            );

            this.homeRepo.setScooter(scooterEntity);
          }
        } else {
          await this.storageRepo.removeItem(keys.rideId);
          this.rideRepo.setIsSuccess(false);
          this.rideRepo.setErrorMessage("Your ride has already ended.");
        }
      }
      this.rideRepo.setIsLoading(false);
    }
  }
}
