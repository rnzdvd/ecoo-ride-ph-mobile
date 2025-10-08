import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RegistrationContainer from "../ui/registration/registration.container";

const RegistrationScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Registration"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <RegistrationContainer
        onNavigateToOtp={() => navigation.navigate(ScreenNames.ConfirmOtp)}
      />
    </AppScreen>
  );
};

export default RegistrationScreen;
