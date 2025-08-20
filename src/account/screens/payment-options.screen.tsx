import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import PaymentOptionsContainer from "../ui/payment-options/payment-options.container";

const PaymentOptionsScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="TopUp"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <PaymentOptionsContainer onBack={navigation.goBack} />
    </AppScreen>
  );
};

export default PaymentOptionsScreen;
