import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import HomeController from "../../interfaces/controllers/home.controller";
import HomePresenter from "../../interfaces/presenters/home.presenter";
import ScooterDetailsContainer from "../scooter-details/scooter-details.container";
import ScanView from "./scan.view";

const ScanContainer: React.FC<{
  onNavigateToRideInstructions: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new HomeController(store);
  const presenter = new HomePresenter(store);

  const handleScannedQR = (data: string): void => {
    if (!presenter.isLoading() && !presenter.getScannedQRValue()) {
      controller.setScannedQRValue(data);
      controller.loadScooterDetails();
    }
  };

  const handleRemoveScannedQR = (): void => {
    controller.setScannedQRValue("");
  };

  const handleContinue = (): void => {
    handleRemoveScannedQR();
    props.onNavigateToRideInstructions();
  };

  return (
    <Observer>
      {() => {
        const scooter = presenter.getScooter();
        return (
          <View style={{ flex: 1 }}>
            <ScanView onScanSuccess={handleScannedQR} />
            <ScooterDetailsContainer
              scooterEntity={scooter}
              isVisible={!!presenter.getScannedQRValue() && scooter.id !== -1}
              onModalClose={handleRemoveScannedQR}
              onContinue={handleContinue}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default ScanContainer;
