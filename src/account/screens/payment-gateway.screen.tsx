import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import PaymentGatewayContainer from "../ui/payment-gateway/payment-gateway.container";

const PaymentGatewayScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="PaymentGateway"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <PaymentGatewayContainer
        goBack={navigation.goBack}
        onNavigateToBalance={() => navigation.pop(2)}
      />
    </AppScreen>
  );
};

export default PaymentGatewayScreen;
