import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { showToast } from "@/src/common/utils";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import PaymentGatewayView from "./payment-gateway.view";

const PaymentGatewayContainer: React.FC<{
  goBack: () => void;
  onNavigateToBalance: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AccountPresenter(store);
  const controller = new AccountController(store);

  const handleSuccessPayment = async (): Promise<void> => {
    await controller.loadBalance(true);
    showToast(
      "Payment Success",
      "Your wallet has been topped up successfully. If balance does not reflect, please restart the app",
      "success"
    );
    props.onNavigateToBalance();
  };

  const handleFailedPayment = (): void => {
    props.goBack();
    showToast(
      "Payment Failed",
      "Something went wrong with your payment. Please try again.",
      "error"
    );
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Payment Gateway" />
            <PaymentGatewayView
              paymentUrl={presenter.getPaymentUrl()}
              onFailed={handleFailedPayment}
              onSuccess={handleSuccessPayment}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default PaymentGatewayContainer;
