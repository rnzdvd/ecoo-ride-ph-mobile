import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import RideHistoryContainer from "../ui/ride-history/ride-history.container";

const RideHistoryScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="RideHistory"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <RideHistoryContainer />
    </AppScreen>
  );
};

export default RideHistoryScreen;
