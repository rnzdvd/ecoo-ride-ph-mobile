import { ScreenNames } from "@/src/app/screen-registry";
import { StoreContext } from "@/src/app/store";
import AuthController from "@/src/auth/interfaces/controllers/auth.controller";
import AuthPresenter from "@/src/auth/interfaces/presenters/auth.presenter";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import DrawerView from "./drawer.view";

const DrawerContainer: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  return (
    <Observer>
      {() => {
        const authUser = presenter.getAuthUser();
        return (
          <View style={{ flex: 1 }}>
            <DrawerView
              isLoggedIn={presenter.isLoggedIn()}
              authUser={authUser}
              onNavigateToRegistration={() => {
                navigation.navigate(ScreenNames.RegistrationPhaseOne);
              }}
              onNavigateToBalance={() => {
                navigation.navigate(ScreenNames.BalanceScreen);
              }}
              onNavigateToRideHistory={() => {
                navigation.navigate(ScreenNames.RideHistoryScreen);
              }}
              onUserLogout={() => {
                controller.logout();
              }}
            />

            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default DrawerContainer;
