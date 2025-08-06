import AuthRepository from "../../interfaces/gateways/auth.repository";

export default class RegisterAccountCase {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(): Promise<void> {
    this.authRepo.setIsLoggedIn(true);
  }
}
