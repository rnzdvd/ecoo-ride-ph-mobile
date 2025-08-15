import AccountRepository from "@/src/account/interfaces/gateways/account.repository";
import LoadBalanceCase from "@/src/account/usecases/load-balance/load-balance.case";
import ApiGateway from "@/src/common/gateways/api.gateway";
import { IStore } from "../../../app/store";
import LoadScooterDetailsCase from "../../usecases/load-scooter-details/load-scooter-details.case";
import LoadScootersCase from "../../usecases/load-scooters/load-scooters.case";
import SetScannedQrCase from "../../usecases/set-scanned-qr/set-scanned-qr.case";
import HomeRepository from "../gateways/home.repository";

export default class HomeController {
  private readonly store: IStore;
  private readonly setScannedQRCase: SetScannedQrCase;
  private readonly loadScootersCase: LoadScootersCase;
  private readonly loadAccountBalanceCase: LoadBalanceCase;
  private readonly loadScooterDetailsCase: LoadScooterDetailsCase;
  constructor(store: IStore) {
    this.store = store;
    const homeRepo = new HomeRepository(store);
    const accountRepo = new AccountRepository(store);
    const apiGateway = new ApiGateway(store);
    this.setScannedQRCase = new SetScannedQrCase(homeRepo);
    this.loadScootersCase = new LoadScootersCase(apiGateway, homeRepo);
    this.loadAccountBalanceCase = new LoadBalanceCase(apiGateway, accountRepo);
    this.loadScooterDetailsCase = new LoadScooterDetailsCase(
      apiGateway,
      homeRepo
    );
  }

  setScannedQRValue(scannedQRValue: string): void {
    this.setScannedQRCase.execute(scannedQRValue);
  }

  async loadScooters(): Promise<void> {
    await this.loadScootersCase.execute();
  }

  async loadAccountBalance(): Promise<void> {
    await this.loadAccountBalanceCase.execute();
  }

  async loadScooterDetails(): Promise<void> {
    await this.loadScooterDetailsCase.execute();
  }
}
