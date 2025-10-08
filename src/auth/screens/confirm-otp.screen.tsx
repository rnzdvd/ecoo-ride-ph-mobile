import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import ConfirmOtpContainer from "../ui/confirm-otp/confirm-otp.container";

const ConfirmOtpScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Confirm OTP"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <ConfirmOtpContainer
        onNavigateToRegistration={() =>
          navigation.navigate(ScreenNames.PersonalInformation)
        }
        onNavigateToHome={() => navigation.navigate(ScreenNames.HomeScreen)}
      />
    </AppScreen>
  );
};

export default ConfirmOtpScreen;
