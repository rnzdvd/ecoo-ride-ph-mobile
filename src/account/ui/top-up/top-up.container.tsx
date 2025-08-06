import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import TopUpView from "./top-up.view";

const TopUpContainer: React.FC<{
  onBack: () => void;
}> = (props) => (
  <Observer>
    {() => {
      return (
        <View style={{ flex: 1 }}>
          <AppHeaderView title="Your Wallet" onBack={props.onBack} />
          <TopUpView />
        </View>
      );
    }}
  </Observer>
);

export default TopUpContainer;
