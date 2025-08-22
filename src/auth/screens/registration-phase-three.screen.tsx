import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RegistrationPhaseThreeContainer from "../ui/registration-phase-three/registration-phase-three.container";

const RegistrationPhaseThreeScreen: React.FC<IScreenContainer> = ({
  navigation,
}) => {
  return (
    <AppScreen
      title="RegistrationPhaseThree"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <RegistrationPhaseThreeContainer
        onNavigateToHome={() => navigation.navigate(ScreenNames.Drawer)}
        onNavigateToHowToRide={() =>
          navigation.navigate(ScreenNames.HowToRideScreen)
        }
      />
    </AppScreen>
  );
};

export default RegistrationPhaseThreeScreen;
