import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AuthController from "../../interfaces/controllers/auth.controller";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";
import RegistrationView from "./registration.view";

const RegistrationContainer: React.FC<{
  onNavigateToOtp: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AuthPresenter(store);
  const controller = new AuthController(store);

  const handleRequestOtp = async (email: string): Promise<void> => {
    await controller.requestOtp(email);

    if (presenter.isSuccess()) {
      props.onNavigateToOtp();
    }
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <RegistrationView onRequestOtp={handleRequestOtp} />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default RegistrationContainer;
