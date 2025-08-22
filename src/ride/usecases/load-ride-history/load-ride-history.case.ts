import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import HomeRepository from "@/src/home/interfaces/gateways/home.repository";
import { forEach } from "lodash";
import RideEntity from "../../entities/ride.entity";
import RideRepository from "../../interfaces/gateways/ride.repository";

export default class LoadRideHistoryCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly rideRepo: RideRepository,
    private readonly homeRepo: HomeRepository
  ) {}

  async execute(): Promise<void> {
    this.rideRepo.setIsLoading(true);

    const response = await this.apiGateway.getRideHistory();

    if (codeStatusChecker(response.status_code)) {
      const scooters = this.homeRepo.getScooters();
      forEach(response.data, (ride) => {
        const foundScooter = scooters.find(
          (scooter) => scooter.id.toString() === ride.scooter_id
        );
        if (foundScooter) {
          ride.scooter_name = foundScooter.name;
        }
      });

      const rides = RideEntity.fromManyApiModels(response.data);
      this.rideRepo.setRideHistory(rides);
    }

    this.rideRepo.setIsLoading(false);
  }
}
