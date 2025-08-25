import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import { Colors } from "../colors";
import ThreeDsAuthContainer from "../ui/three-ds-auth/three-ds-auth.container";

const ThreeDsAuthScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="ThreeDsAuth"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <ThreeDsAuthContainer
        onNavigateToBalance={() => navigation.pop(2)}
        goBack={() => navigation.goBack()}
      />
    </AppScreen>
  );
};

export default ThreeDsAuthScreen;
