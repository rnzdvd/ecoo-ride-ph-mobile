import { ScreenNames } from "@/src/app/screen-registry";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RideInstructionsContainer from "../ui/ride-instructions/ride-instructions.container";

const RideInstructionsScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="RideInstructions"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <RideInstructionsContainer
        onNavigateToRide={() => {
          navigation.navigate(ScreenNames.RideScreen);
        }}
      />
    </AppScreen>
  );
};

export default RideInstructionsScreen;
