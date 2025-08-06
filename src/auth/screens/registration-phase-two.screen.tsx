import { ScreenNames } from "@/src/app/screen-registry";
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
      statusBarBg="black"
    >
      <RegistrationPhaseTwoContainer
        onOtpConfirmed={() =>
          navigation.navigate(ScreenNames.RegistrationPhaseThree)
        }
      />
    </AppScreen>
  );
};

export default RegistrationPhaseTwoScreen;
