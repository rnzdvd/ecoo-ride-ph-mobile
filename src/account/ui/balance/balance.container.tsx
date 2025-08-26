/* eslint-disable react-hooks/exhaustive-deps */
import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import { showToast } from "@/src/common/utils";
import { Observer } from "mobx-react-lite";
import React from "react";
import { Alert, View } from "react-native";
import CardEntity from "../../entities/card.entity";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import BalanceView from "./balance.view";

const BalanceContainer: React.FC<{
  onNavigateToTopUp: () => void;
  onAddNewCard: () => void;
  onBack: () => void;
}> = (props) => {
  const cardRef = React.useRef<CardEntity | null>(null);
  const store = React.useContext(StoreContext);
  const presenter = new AccountPresenter(store);
  const controller = new AccountController(store);

  React.useEffect(() => {
    controller.loadEWallets();
    controller.loadCards();
  }, []);

  const handleRemoveCard = async (): Promise<void> => {
    if (cardRef.current) {
      await controller.removeCard(cardRef.current.id);

      if (presenter.isSuccess()) {
        showToast("Card Deleted", "Your card has been deleted.", "success");
      } else {
        showToast("Card Delete Failed", "Something went wrong.", "error");
      }
    }
  };

  const showDeleteCardDialog = (): void => {
    Alert.alert(
      "Confirm Action", // Title
      "Are you sure you want to delete this card?", // Message
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: handleRemoveCard,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Observer>
      {() => {
        const cards = presenter.getCards();
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Payment" onBack={props.onBack} />
            <BalanceView
              cards={cards}
              onAddNewCard={props.onAddNewCard}
              onNavigateToTopUp={props.onNavigateToTopUp}
              balanceEntity={presenter.getBalance()}
              onRemoveCard={(card) => {
                cardRef.current = card;
                showDeleteCardDialog();
              }}
            />
            <AppLoaderView isVisible={presenter.isLoading()} />
          </View>
        );
      }}
    </Observer>
  );
};
export default BalanceContainer;
