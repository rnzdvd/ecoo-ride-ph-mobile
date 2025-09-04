import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import ViewProfileContainer from "../ui/view-profile/view-profile.container";

const ViewProfileScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="ViewProfile"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <ViewProfileContainer />
    </AppScreen>
  );
};

export default ViewProfileScreen;
