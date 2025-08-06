import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import SplashContainer from "../ui/splash/splash.container";

const SplashScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Splash"
      navigation={navigation}
      barStyle="light-content"
      statusBarBg={Colors.mainBlue}
    >
      <SplashContainer
        onNavigateToHome={() => navigation.navigate(ScreenNames.Drawer)}
      />
    </AppScreen>
  );
};

export default SplashScreen;
