/* eslint-disable react-hooks/exhaustive-deps */
import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { showToast } from "@/src/common/utils";
import { Observer } from "mobx-react-lite";
import React from "react";
import { Linking, View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import TopUpView from "./top-up.view";

const TopUpContainer: React.FC<{
  onBack: () => void;
  onNavigateToPaymentOptions: () => void;
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

  React.useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Listen for future deep links while the app is open
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  const handleDeepLink = async (url: string): Promise<void> => {
    if (url.includes("/success")) {
      await controller.loadBalance(true);
      showToast(
        "Payment Success",
        "Your wallet has been topped up successfully. If balance does not reflect, please restart the app",
        "success"
      );
    } else if (url.includes("/fail")) {
      showToast(
        "Payment Failed",
        "Something went wrong with your payment. Please try again.",
        "error"
      );
    } else if (url.includes("/cancel")) {
      showToast(
        "Payment Canceled",
        "User has canceled the payment.",
        "warning"
      );
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
              onPaymentOptions={props.onNavigateToPaymentOptions}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default TopUpContainer;
