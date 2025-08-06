import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import LoginContainer from "../ui/login/login.container";

const LoginScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Login"
      navigation={navigation}
      barStyle="light-content"
      statusBarBg="white"
    >
      <LoginContainer />
    </AppScreen>
  );
};

export default LoginScreen;
