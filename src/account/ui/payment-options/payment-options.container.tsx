import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import PaymentOptionsView from "./payment-options.view";

const PaymentOptionsContainer: React.FC<{
  onBack: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new AccountController(store);

  const handleSelectPaymentMethod = (paymentMethod: string): void => {
    controller.selectPaymentMethod(paymentMethod);
    props.onBack();
  };
  // Logic to handle payment method selection
  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Payment Options" onBack={props.onBack} />
            <PaymentOptionsView
              onSelectPaymentMethod={handleSelectPaymentMethod}
            />
          </View>
        );
      }}
    </Observer>
  );
};
export default PaymentOptionsContainer;
