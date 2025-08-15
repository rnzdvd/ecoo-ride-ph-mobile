import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import AuthController from "../../interfaces/controllers/auth.controller";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";
import RegistrationPhaseTwoView from "./registration-phase-two.view";

const RegistrationPhaseTwoContainer: React.FC<{
  onNavigateToRegistration: () => void;
  onNavigateToHome: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AuthPresenter(store);
  const controller = new AuthController(store);

  const handleOtpConfirmed = async (otp: string): Promise<void> => {
    await controller.confirmOtp(otp);

    if (presenter.isSuccess()) {
      if (presenter.isLoggedIn()) {
        // navigate directly to home
        props.onNavigateToHome();
      } else {
        props.onNavigateToRegistration();
      }
    } else {
      Toast.show({ text1: presenter.getErrorMessage(), type: "error" });
    }
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <RegistrationPhaseTwoView
              onOtpConfirmed={handleOtpConfirmed}
              emailRegistered={presenter.getEmailRegistered()}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default RegistrationPhaseTwoContainer;
