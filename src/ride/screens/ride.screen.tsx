import { ScreenNames } from "@/src/app/screen-registry";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RideContainer from "../ui/ride/ride.container";

const RideScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Ride"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <RideContainer
        onNavigateToHome={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenNames.Drawer }],
            })
          );
        }}
      />
    </AppScreen>
  );
};

export default RideScreen;
