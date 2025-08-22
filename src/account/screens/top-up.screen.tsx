import { ScreenNames } from "@/src/app/screen-registry";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import TopUpContainer from "../ui/top-up/top-up.container";

const TopUpScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="TopUp"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <TopUpContainer
        onBack={navigation.goBack}
        onNavigateToPaymentOptions={() =>
          navigation.navigate(ScreenNames.PaymentOptionsScreen)
        }
      />
    </AppScreen>
  );
};

export default TopUpScreen;
