import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import RideRepository from "../../interfaces/gateways/ride.repository";

export default class LoadRideDistanceByIdCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly rideRepo: RideRepository
  ) {}

  async execute(): Promise<void> {
    const ride = this.rideRepo.getCurrentRide();

    const response = await this.apiGateway.getTotalDistanceById(
      ride.id.toString()
    );

    if (codeStatusChecker(response.status_code)) {
      const totalDistance = response.data.total_distance;
      ride.setTotalDistance(totalDistance);
      this.rideRepo.setCurrentRide(ride);
    }
  }
}
