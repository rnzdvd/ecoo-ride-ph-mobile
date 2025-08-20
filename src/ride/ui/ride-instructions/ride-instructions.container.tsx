import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import RideController from "../../interfaces/controllers/ride.controller";
import RidePresenter from "../../interfaces/presenters/ride.presenter";
import RideInstructionsView from "./ride-instructions.view";

const RideInstructionsContainer: React.FC<{
  onNavigateToRide: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new RidePresenter(store);
  const controller = new RideController(store);

  const handleStartRide = async (): Promise<void> => {
    // Logic to start the ride goes here
    await controller.startRide();
    if (presenter.isSuccess()) {
      Toast.show({
        type: "success",
        text1: "Ride Started Succesfully",
      });
      props.onNavigateToRide();
    }
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <RideInstructionsView onStartRide={handleStartRide} />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default RideInstructionsContainer;
