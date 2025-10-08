import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import PersonalInformationContainer from "../ui/personal-information/personal-information.container";

const PersonalInformationScreen: React.FC<IScreenContainer> = ({
  navigation,
}) => {
  return (
    <AppScreen
      title="Personal Information"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <PersonalInformationContainer
        onNavigateToHowToRide={() =>
          navigation.navigate(ScreenNames.HowToRideScreen)
        }
      />
    </AppScreen>
  );
};

export default PersonalInformationScreen;
