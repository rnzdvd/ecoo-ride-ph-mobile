import React from "react";
import AccountStore from "../account/entities/account.store";
import AuthStore from "../auth/entities/auth.store";
import HomeStore from "../home/entities/home.store";
import RideStore from "../ride/entities/ride.store";

export type IStore = ReturnType<typeof getStore>;

export default function getStore() {
  return {
    home: new HomeStore(),
    auth: new AuthStore(),
    account: new AccountStore(),
    ride: new RideStore(),
  };
}

export const StoreContext = React.createContext({} as IStore);
