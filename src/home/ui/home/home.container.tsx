import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import HomeController from "../../interfaces/controllers/home.controller";
import HomePresenter from "../../interfaces/presenters/home.presenter";
import HomeView from "./home.view";

const HomeContainer: React.FC<{
  onOpenDrawer: () => void;
  onScanQR: () => void;
  onGetStarted: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);

  const controller = new HomeController(store);
  const presenter = new HomePresenter(store);

  React.useEffect(() => {
    controller.loadScooters();

    if (presenter.isLoggedIn()) {
      controller.loadAccountBalance();
    }
  }, []);

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
