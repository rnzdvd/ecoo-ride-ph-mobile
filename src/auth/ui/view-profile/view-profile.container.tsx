import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AuthPresenter from "../../interfaces/presenters/auth.presenter";
import ViewProfileView from "./view-profile.view";

const ViewProfileContainer: React.FC = () => {
  const store = React.useContext(StoreContext);
  const presenter = new AuthPresenter(store);
  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="View Profile" />
            <ViewProfileView
              user={presenter.getAuthUser()}
              userStat={presenter.getUserStats()}
            />
          </View>
        );
      }}
    </Observer>
  );
};

export default ViewProfileContainer;
