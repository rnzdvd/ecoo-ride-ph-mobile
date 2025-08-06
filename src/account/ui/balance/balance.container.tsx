import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import BalanceView from "./balance.view";

const BalanceContainer: React.FC<{
  onNavigateToTopUp: () => void;
  onBack: () => void;
}> = (props) => {
  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Payment" onBack={props.onBack} />
            <BalanceView onNavigateToTopUp={props.onNavigateToTopUp} />
          </View>
        );
      }}
    </Observer>
  );
};
export default BalanceContainer;
