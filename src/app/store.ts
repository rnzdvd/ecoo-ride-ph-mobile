import React from "react";
import AuthStore from "../auth/entities/auth.store";
import HomeStore from "../home/entities/home.entity";

export type IStore = ReturnType<typeof getStore>;

export default function getStore() {
  return {
    home: new HomeStore(),
    auth: new AuthStore(),
  };
}

export const StoreContext = React.createContext({} as IStore);
