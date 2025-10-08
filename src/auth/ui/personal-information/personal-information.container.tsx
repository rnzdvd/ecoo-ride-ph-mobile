import { StoreContext } from "@/src/app/store";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { showToast } from "@/src/common/utils";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AuthController from "../../interfaces/controllers/auth.controller";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";
import PersonalInformationView, {
  IPersonalInformationFormModel,
} from "./personal-information.view";

const PersonalInformationContainer: React.FC<{
  onNavigateToHowToRide: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);
  const presenter = new AuthPresenter(store);

  const handleConfirm = async (
    form: IPersonalInformationFormModel
  ): Promise<void> => {
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
            <PersonalInformationView
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

export default PersonalInformationContainer;
