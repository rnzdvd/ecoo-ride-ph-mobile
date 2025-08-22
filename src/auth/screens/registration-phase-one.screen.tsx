import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RegistrationPhaseOneContainer from "../ui/registration-phase-one/registration-phase-one.container";

const RegistrationPhaseOneScreen: React.FC<IScreenContainer> = ({
  navigation,
}) => {
  return (
    <AppScreen
      title="RegistrationPhaseOne"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <RegistrationPhaseOneContainer
        onNavigateToOtp={() =>
          navigation.navigate(ScreenNames.RegistrationPhaseTwo)
        }
      />
    </AppScreen>
  );
};

export default RegistrationPhaseOneScreen;
