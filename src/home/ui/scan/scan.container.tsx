import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import EnterScooterIdModalView from "@/src/ride/ui/enter-scooter-id-modal/enter-scooter-id-modal.view";
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
  const [showInputModal, setShowInputModal] = React.useState<boolean>(false);
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

  const handleManualIdInput = (id: string | null): void => {
    if (id) {
      setShowInputModal(false);

      setTimeout(() => {
        handleScannedQR(id);
      }, 1000);
    }
  };

  return (
    <Observer>
      {() => {
        const scooter = presenter.getScooter();
        return (
          <View style={{ flex: 1 }}>
            <ScanView
              onScanSuccess={handleScannedQR}
              onEnterScooterId={() => setShowInputModal(true)}
            />
            <ScooterDetailsContainer
              scooterEntity={scooter}
              isVisible={!!presenter.getScannedQRValue() && scooter.id !== -1}
              onModalClose={handleRemoveScannedQR}
              onContinue={handleContinue}
            />

            <EnterScooterIdModalView
              onContinue={handleManualIdInput}
              isVisible={showInputModal}
              onCloseModal={() => setShowInputModal(false)}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default ScanContainer;
