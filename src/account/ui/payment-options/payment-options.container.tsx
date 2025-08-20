import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import PaymentOptionsView from "./payment-options.view";

const PaymentOptionsContainer: React.FC<{
  onBack: () => void;
}> = (props) => {
  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Payment Options" onBack={props.onBack} />
            <PaymentOptionsView />
          </View>
        );
      }}
    </Observer>
  );
};
export default PaymentOptionsContainer;
