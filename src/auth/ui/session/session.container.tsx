/* eslint-disable react-hooks/exhaustive-deps */
import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { showToast } from "@/src/common/utils";
import { autorun } from "mobx";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AuthController from "../../interfaces/controllers/auth.controller";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";

const SessionContainer: React.FC<{
  children: JSX.Element;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  React.useEffect(() => {
    const dispose = autorun(() => {
      if (presenter.isSessionExpired()) {
        showToast(
          "Session Expired",
          "Please log in again to continue.",
          "error"
        );
        controller.logout();
      }
    });

    return () => dispose();
  }, []);

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            {props.children}
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default SessionContainer;
