import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { showToast } from "@/src/common/utils";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AuthController from "../../interfaces/controllers/auth.controller";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";
import RegistrationPhaseThreeView, {
  IRegistrationFormModel,
} from "./registration-phase-three.view";

const RegistrationPhaseThreeContainer: React.FC<{
  onNavigateToHome: () => void;
  onNavigateToHowToRide: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  const handleConfirm = async (form: IRegistrationFormModel): Promise<void> => {
    await controller.registerAccount(form);

    if (presenter.isLoggedIn()) {
      props.onNavigateToHowToRide();
    } else {
      showToast("Registration Failed", presenter.getErrorMessage(), "error");
    }
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <RegistrationPhaseThreeView
              onConfirm={handleConfirm}
              registeredEmail={presenter.getEmailRegistered()}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default RegistrationPhaseThreeContainer;
