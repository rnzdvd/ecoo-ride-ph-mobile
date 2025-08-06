import { StoreContext } from "@/src/app/store";
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
    controller.setScannedQRValue(data);
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <ScanView onScanSuccess={handleScannedQR} />
            <ScooterDetailsContainer
              isVisible={!!presenter.getScannedQRValue()}
              onModalClose={() => handleScannedQR("")}
              onContinue={() => {
                handleScannedQR("");
                props.onNavigateToRideInstructions();
              }}
            />
          </View>
        );
      }}
    </Observer>
  );
};

export default ScanContainer;
