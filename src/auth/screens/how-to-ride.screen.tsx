import { ScreenNames } from "@/src/app/screen-registry";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import HowToRideContainer from "../ui/how-to-ride/how-to-ride.container";

const HowToRideScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="HowToRide"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <HowToRideContainer
        onNavigateToHome={() => navigation.navigate(ScreenNames.Drawer)}
      />
    </AppScreen>
  );
};

export default HowToRideScreen;
