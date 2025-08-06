import { ScreenNames } from "@/src/app/screen-registry";
import { StoreContext } from "@/src/app/store";
import AuthController from "@/src/auth/interfaces/controllers/auth.controller";
import AuthPresenter from "@/src/auth/interfaces/presenters/auth.presenter";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Observer } from "mobx-react-lite";
import React from "react";
import DrawerView from "./drawer.view";

const DrawerContainer: React.FC<DrawerContentComponentProps> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  return (
    <Observer>
      {() => {
        return (
          <DrawerView
            isLoggedIn={presenter.isLoggedIn()}
            onNavigateToRegistration={() => {
              props.navigation.navigate(ScreenNames.RegistrationPhaseOne);
            }}
            onNavigateToBalance={() => {
              props.navigation.navigate(ScreenNames.BalanceScreen);
            }}
          />
        );
      }}
    </Observer>
  );
};
export default DrawerContainer;
