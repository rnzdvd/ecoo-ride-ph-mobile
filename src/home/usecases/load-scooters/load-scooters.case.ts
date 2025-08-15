import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import ScooterEntity from "../../entities/scooter.entity";
import HomeRepository from "../../interfaces/gateways/home.repository";

export default class LoadScootersCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly homeRepo: HomeRepository
  ) {}

  async execute(): Promise<void> {
    this.homeRepo.setIsLoading(true);

    const response = await this.apiGateway.getScooters();
    if (codeStatusChecker(response.status_code)) {
      const scooters = ScooterEntity.fromManyApiModels(response.data.data);
      this.homeRepo.setScooters(scooters);
    }

    this.homeRepo.setIsLoading(false);
  }
}
