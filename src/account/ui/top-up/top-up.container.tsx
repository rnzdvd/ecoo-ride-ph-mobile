import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import TopUpView from "./top-up.view";

const TopUpContainer: React.FC<{
  onBack: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AccountPresenter(store);
  const controller = new AccountController(store);

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Your Wallet" onBack={props.onBack} />
            <TopUpView balanceEntity={presenter.getBalance()} />
          </View>
        );
      }}
    </Observer>
  );
};

export default TopUpContainer;
