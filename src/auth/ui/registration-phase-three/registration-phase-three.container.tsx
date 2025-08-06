import { StoreContext } from "@/src/app/store";
import { Observer } from "mobx-react-lite";
import React from "react";
import AuthController from "../../interfaces/controllers/auth.controller";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";
import RegistrationPhaseThreeView from "./registration-phase-three.view";

const RegistrationPhaseThreeContainer: React.FC<{
  onNavigateToHome: () => void;
  onNavigateToHowToRide: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  const handleConfirm = async (): Promise<void> => {
    await controller.registerAccount();

    if (presenter.isLoggedIn()) {
      props.onNavigateToHowToRide();
    }
  };

  return (
    <Observer>
      {() => {
        return <RegistrationPhaseThreeView onConfirm={handleConfirm} />;
      }}
    </Observer>
  );
};
export default RegistrationPhaseThreeContainer;
