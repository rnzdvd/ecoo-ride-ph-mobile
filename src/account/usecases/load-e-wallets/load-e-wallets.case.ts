import EwalletEntity from "../../entities/ewallet.entity";
import AccountRepository from "../../interfaces/gateways/account.repository";

export interface IEwalletListResponseModel {
  id: string;
  name: string;
  percentage_fee: number;
  wallet_logo: string;
  fixed_fee: number;
}

export default class LoadEWalletsCase {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(): Promise<void> {
    const fixedWallets: IEwalletListResponseModel[] = [
      {
        id: "GCASH",
        name: "GCash",
        percentage_fee: 2.3,
        wallet_logo: "../../../../assets/images/gcash_logo.png",
        fixed_fee: 0,
      },
      {
        id: "PAYMAYA",
        name: "Paymaya",
        percentage_fee: 1.8,
        wallet_logo: "../../../../assets/images/maya_logo.png",
        fixed_fee: 0,
      },
    ];

    const eWallets = EwalletEntity.fromManyApiModels(fixedWallets);
    this.accountRepo.setCurrentPaymentMethod(eWallets[0]);
    this.accountRepo.setEwallets(eWallets);
  }
}
