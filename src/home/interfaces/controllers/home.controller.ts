import { IStore } from "../../../app/store";
import SetScannedQrCase from "../../usecases/set-scanned-qr/set-scanned-qr.case";
import HomeRepository from "../gateways/home.repository";

export default class HomeController {
  private readonly store: IStore;
  private readonly setScannedQRCase: SetScannedQrCase;
  constructor(store: IStore) {
    this.store = store;
    const homeRepo = new HomeRepository(store);
    this.setScannedQRCase = new SetScannedQrCase(homeRepo);
  }

  setScannedQRValue(scannedQRValue: string): void {
    this.setScannedQRCase.execute(scannedQRValue);
  }
}
