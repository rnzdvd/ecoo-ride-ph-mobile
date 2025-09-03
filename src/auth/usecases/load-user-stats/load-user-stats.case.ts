import ApiGateway from "@/src/common/gateways/api.gateway";
import { codeStatusChecker } from "@/src/common/utils";
import UserStatsEntity from "../../entities/user-stats.entity";
import AuthRepository from "../../interfaces/gateways/auth.repository";

export default class LoadUserStatsCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly authRepo: AuthRepository
  ) {}

  async execute(): Promise<void> {
    this.authRepo.setIsLoading(true);

    const response = await this.apiGateway.getUserStats();

    if (codeStatusChecker(response.status_code)) {
      this.authRepo.setIsSuccess(true);
      const userStatsEntity = UserStatsEntity.fromApiModel(response.data);
      this.authRepo.setUserStats(userStatsEntity);
    }

    this.authRepo.setIsLoading(false);
  }
}
