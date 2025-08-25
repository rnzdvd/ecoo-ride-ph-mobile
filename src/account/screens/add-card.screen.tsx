import { ScreenNames } from "@/src/app/screen-registry";
import React from "react";
import AppScreen, { IScreenContainer } from "../../common/ui/app.screen";
import AddCardContainer from "../ui/add-card/add-card.container";

const AddCardScreen: React.FC<IScreenContainer> = ({ navigation }) => {
  return (
    <AppScreen
      title="AddCard"
      navigation={navigation}
      barStyle="dark-content"
      statusBarBg="white"
    >
      <AddCardContainer
        onNavigateToThreeDsAuth={() =>
          navigation.navigate(ScreenNames.ThreeDsAuthWebviewScreen)
        }
      />
    </AppScreen>
  );
};

export default AddCardScreen;
