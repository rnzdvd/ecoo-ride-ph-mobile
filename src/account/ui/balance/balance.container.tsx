import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import BalanceView from "./balance.view";

const BalanceContainer: React.FC<{
  onNavigateToTopUp: () => void;
  onBack: () => void;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const presenter = new AccountPresenter(store);
  const controller = new AccountController(store);

  React.useEffect(() => {
    controller.loadBalance();
  }, []);

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Payment" onBack={props.onBack} />
            <BalanceView
              onNavigateToTopUp={props.onNavigateToTopUp}
              balanceEntity={presenter.getBalance()}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default BalanceContainer;
