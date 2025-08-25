import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import BalanceContainer from "../ui/balance/balance.container";

const BalanceScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Balance"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <BalanceContainer
        onAddNewCard={() => navigation.navigate(ScreenNames.AddCardScreen)}
        onNavigateToTopUp={() => navigation.navigate(ScreenNames.TopUpScreen)}
        onBack={navigation.goBack}
      />
    </AppScreen>
  );
};

export default BalanceScreen;
