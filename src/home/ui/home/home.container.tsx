import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import HomeController from "../../interfaces/controllers/home.controller";
import HomePresenter from "../../interfaces/presenters/home.presenter";
import HomeView from "./home.view";

const HomeContainer: React.FC<{
  onOpenDrawer: () => void;
  onScanQR: () => void;
  onGetStarted: () => void;
  onNavigateToRide: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);

  const controller = new HomeController(store);
  const presenter = new HomePresenter(store);

  React.useEffect(() => {
    handleLoadOngoingRide();
    controller.loadScooters();

    if (presenter.isLoggedIn()) {
      controller.loadAccountBalance();
    }
  }, []);

  const handleLoadOngoingRide = async (): Promise<void> => {
    await controller.loadOngoingRide();

    if (presenter.getCurrentRide().id !== -1) {
      props.onNavigateToRide();
    }

    if (presenter.getRideErrorMessage()) {
      Toast.show({
        type: "error",
        text1: presenter.getRideErrorMessage(),
      });
    }
  };

  return (
    <Observer>
      {() => {
        const scooters = presenter.getScooters();
        return (
          <View style={{ flex: 1 }}>
            <HomeView
              scooters={scooters}
              onOpenDrawer={props.onOpenDrawer}
              onScanQR={props.onScanQR}
              onGetStarted={props.onGetStarted}
              isLoggedIn={presenter.isLoggedIn()}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default HomeContainer;
