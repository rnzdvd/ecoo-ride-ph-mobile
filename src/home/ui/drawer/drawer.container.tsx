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

  React.useEffect(() => {
    controller.loadUserStats();
  }, []);

  const handleNavigation = (screen: string) => {
    navigation.navigate(ScreenNames.Drawer, {
      screen: ScreenNames.HomeStack,
      params: {
        screen: screen,
      },
    });
  };

  return (
    <Observer>
      {() => {
        const authUser = presenter.getAuthUser();
        const userStats = presenter.getUserStats();
        return (
          <View style={{ flex: 1 }}>
            <DrawerView
              userStats={userStats}
              isLoggedIn={presenter.isLoggedIn()}
              authUser={authUser}
              onNavigateToRegistration={() =>
                handleNavigation(ScreenNames.Registration)
              }
              onNavigateToBalance={() =>
                handleNavigation(ScreenNames.BalanceScreen)
              }
              onNavigateToRideHistory={() =>
                handleNavigation(ScreenNames.RideHistoryScreen)
              }
              onNavigateToViewProfile={() =>
                handleNavigation(ScreenNames.ViewProfileScreen)
              }
              onUserLogout={() => controller.logout()}
            />

            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default DrawerContainer;
