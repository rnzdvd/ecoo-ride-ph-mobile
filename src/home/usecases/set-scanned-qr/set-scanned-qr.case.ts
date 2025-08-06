import HomeRepository from "../../interfaces/gateways/home.repository";

export default class SetScannedQrCase {
  constructor(private readonly homeRepo: HomeRepository) {}

  async execute(scannedQRValue: string): Promise<void> {
    this.homeRepo.setScannedQRValue(scannedQRValue);
  }
}
