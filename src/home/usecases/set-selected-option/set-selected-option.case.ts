import HomeRepository from "../../interfaces/gateways/home.repository";

export default class SetSelectedOptionCase {
  constructor(private readonly homeRepo: HomeRepository) {}

  async execute(selectedOption: string): Promise<void> {
    this.homeRepo.setSelectedOption(selectedOption);
  }
}
