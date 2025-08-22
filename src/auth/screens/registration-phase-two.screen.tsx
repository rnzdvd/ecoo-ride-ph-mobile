import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RegistrationPhaseTwoContainer from "../ui/registration-phase-two/registration-phase-two.container";

const RegistrationPhaseTwoScreen: React.FC<IScreenContainer> = ({
  navigation,
}) => {
  return (
    <AppScreen
      title="RegistrationPhaseTwo"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <RegistrationPhaseTwoContainer
        onNavigateToRegistration={() =>
          navigation.navigate(ScreenNames.RegistrationPhaseThree)
        }
        onNavigateToHome={() => navigation.navigate(ScreenNames.Drawer)}
      />
    </AppScreen>
  );
};

export default RegistrationPhaseTwoScreen;
