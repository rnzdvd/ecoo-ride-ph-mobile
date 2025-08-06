import { StoreContext } from "@/src/app/store";
import AuthController from "@/src/auth/interfaces/controllers/auth.controller";
import AuthPresenter from "@/src/auth/interfaces/presenters/auth.presenter";
import { Observer } from "mobx-react-lite";
import React from "react";
import HomeView from "./home.view";

const HomeContainer: React.FC<{
  onOpenDrawer: () => void;
  onScanQR: () => void;
  onGetStarted: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  return (
    <Observer>
      {() => {
        return (
          <HomeView
            onOpenDrawer={props.onOpenDrawer}
            onScanQR={props.onScanQR}
            onGetStarted={props.onGetStarted}
            isLoggedIn={presenter.isLoggedIn()}
          />
        );
      }}
    </Observer>
  );
};
export default HomeContainer;
