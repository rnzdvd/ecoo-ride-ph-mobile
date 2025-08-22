import { ScreenNames } from "@/src/app/screen-registry";
import { Colors } from "@/src/common/colors";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import HomeContainer from "../ui/home/home.container";

const HomeScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="Home"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg={Colors.white}
    >
      <HomeContainer
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        onScanQR={() => navigation.navigate(ScreenNames.ScanScreen)}
        onGetStarted={() =>
          navigation.navigate(ScreenNames.RegistrationPhaseOne)
        }
        onNavigateToRide={() => navigation.navigate(ScreenNames.RideScreen)}
      />
    </AppScreen>
  );
};

export default HomeScreen;
