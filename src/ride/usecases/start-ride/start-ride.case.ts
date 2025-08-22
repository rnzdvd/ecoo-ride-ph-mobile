import ApiGateway from "@/src/common/gateways/api.gateway";
import StorageRepository from "@/src/common/interfaces/gateways/storage.repository";
import { keys } from "@/src/common/keys";
import { codeStatusChecker } from "@/src/common/utils";
import RideEntity from "../../entities/ride.entity";
import RideRepository from "../../interfaces/gateways/ride.repository";

export default class StartRideCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly rideRepo: RideRepository,
    private readonly storageRepo: StorageRepository
  ) {}

  async execute(): Promise<void> {
    this.rideRepo.setIsLoading(true);
    const scooter = this.rideRepo.getScooter();
    const selectedOption = this.rideRepo.getSelectedOption();

    const response = await this.apiGateway.startRide({
      scooter_id: scooter.id.toString(),
      option: selectedOption,
    });

    if (codeStatusChecker(response.status_code)) {
      this.rideRepo.setIsSuccess(true);

      const rideEntity = RideEntity.fromApiModel(response.data.ride);
      this.rideRepo.setCurrentRide(rideEntity);
      await this.storageRepo.setItem(keys.rideId, rideEntity.id.toString());
    } else {
      this.rideRepo.setIsSuccess(false);
    }

    this.rideRepo.setIsLoading(false);
  }
}
