import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { Linking, View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import TopUpView from "./top-up.view";

const TopUpContainer: React.FC<{
  onBack: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AccountPresenter(store);
  const controller = new AccountController(store);

  const handleTopUp = async (amount: number): Promise<void> => {
    await controller.requestPayment(amount);

    if (presenter.isSuccess()) {
      Linking.openURL(presenter.getPaymentUrl());
    }
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Your Wallet" onBack={props.onBack} />
            <TopUpView
              balanceEntity={presenter.getBalance()}
              paymentMethod={presenter.getCurrentPaymentMethod()}
              onTopUp={handleTopUp}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default TopUpContainer;
