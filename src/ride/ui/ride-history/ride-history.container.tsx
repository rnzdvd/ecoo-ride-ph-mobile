import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import RideController from "../../interfaces/controllers/ride.controller";
import RidePresenter from "../../interfaces/presenters/ride.presenter";
import RideHistoryView from "./ride-history.view";

const RideHistoryContainer: React.FC = () => {
  const store = React.useContext(StoreContext);
  const presenter = new RidePresenter(store);
  const controller = new RideController(store);

  React.useEffect(() => {
    controller.loadRideHistory();
  }, []);

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Ride History" />
            <RideHistoryView rideHistory={presenter.getRideHistory()} />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default RideHistoryContainer;
