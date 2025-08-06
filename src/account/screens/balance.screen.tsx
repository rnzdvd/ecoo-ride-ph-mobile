import { ScreenNames } from "@/src/app/screen-registry";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import BalanceContainer from "../ui/balance/balance.container";

const BalanceScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Balance"
      navigation={navigation}
      barStyle="default"
      statusBarBg="black"
    >
      <BalanceContainer
        onNavigateToTopUp={() => navigation.navigate(ScreenNames.TopUpScreen)}
        onBack={navigation.goBack}
      />
    </AppScreen>
  );
};

export default BalanceScreen;
