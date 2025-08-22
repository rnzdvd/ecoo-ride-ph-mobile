import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import SplashContainer from "../ui/splash/splash.container";

const SplashScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Splash"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.primaryColor}
    >
      <SplashContainer
        onNavigateToHome={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenNames.Drawer }],
            })
          );
        }}
      />
    </AppScreen>
  );
};

export default SplashScreen;
