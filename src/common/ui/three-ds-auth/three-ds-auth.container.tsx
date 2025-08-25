import AccountController from "@/src/account/interfaces/controllers/account.controller";
import AccountPresenter from "@/src/account/interfaces/presenters/account.presenter";
import { StoreContext } from "@/src/app/store";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import { showToast } from "../../utils";
import AppHeaderView from "../app-header/app-header.view";
import AppLoaderView from "../app-loader/app-loader.view";
import ThreeDsAuthView from "./three-ds-auth.view";

const ThreeDsAuthContainer: React.FC<{
  goBack: () => void;
  onNavigateToBalance: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AccountPresenter(store);
  const controller = new AccountController(store);

  const handleSuccessAuth = async (): Promise<void> => {
    await controller.loadCards(true);
    showToast(
      "Card Added Succesfully",
      "Your card has been added. If it doesn’t appear right away, please restart the app.",
      "success"
    );
    props.onNavigateToBalance();
  };

  const handleFailedAuth = (): void => {
    props.goBack();
    showToast(
      "Card Add Failed",
      "We couldn’t add your card at the moment. Please try again later.",
      "error"
    );
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Merchant Authentication" />
            <ThreeDsAuthView
              threeDsUrl={presenter.get3dsUrl()}
              onFailed={handleFailedAuth}
              onSuccess={handleSuccessAuth}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default ThreeDsAuthContainer;
