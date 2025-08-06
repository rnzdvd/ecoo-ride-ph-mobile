import { ScreenNames } from "@/src/app/screen-registry";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import ScanContainer from "../ui/scan/scan.container";

const ScanScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Scan"
      navigation={navigation}
      barStyle="light-content"
      statusBarBg="white"
    >
      <ScanContainer
        onNavigateToRideInstructions={() => {
          navigation.navigate(ScreenNames.RideInstructionsScreen);
        }}
      />
    </AppScreen>
  );
};

export default ScanScreen;
