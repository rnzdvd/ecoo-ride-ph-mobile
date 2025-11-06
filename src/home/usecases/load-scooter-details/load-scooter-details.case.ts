import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import ScooterEntity from "../../entities/scooter.entity";
import HomeRepository from "../../interfaces/gateways/home.repository";

export default class LoadScooterDetailsCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly homeRepo: HomeRepository
  ) {}

  async execute(): Promise<void> {
    this.homeRepo.setIsLoading(true);

    const scannedQR = this.homeRepo.getScannedQRValue();

    const response = await this.apiGateway.getScooterById(scannedQR);

    if (codeStatusChecker(response.status_code)) {
      const scooterEntity = ScooterEntity.fromApiModel(response.data);
      this.homeRepo.setScooter(scooterEntity);
    }

    this.homeRepo.setIsLoading(false);
  }
}
