import { IStore } from "@/src/app/store";
import { Api } from "../api/api";

export default class ApiGateway extends Api {
  private readonly store: IStore;

  constructor(store: IStore) {
    super(store);
    this.store = store;
  }
}
