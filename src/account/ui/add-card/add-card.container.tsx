import { StoreContext } from "@/src/app/store";
import AppHeaderView from "@/src/common/ui/app-header/app-header.view";
import AppLoaderView from "@/src/common/ui/app-loader/app-loader.view";
import XenditFingeprintView from "@/src/common/ui/xendit-fingeprint/xendit-fingeprint.view";
import { showToast } from "@/src/common/utils";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import AccountController from "../../interfaces/controllers/account.controller";
import AccountPresenter from "../../interfaces/presenters/account.presenter";
import AddCardView, { ICardFormModel } from "./add-card.view";

const AddCardContainer: React.FC<{
  onNavigateToThreeDsAuth: () => void;
}> = (props) => {
  const fp = React.useRef<string | null>(null);

  const store = React.useContext(StoreContext);
  const controller = new AccountController(store);
  const presenter = new AccountPresenter(store);

  const handleAddNewCard = async (card: ICardFormModel): Promise<void> => {
    if (fp.current) {
      await controller.addCard(card, fp.current);

      if (presenter.isSuccess() && presenter.get3dsUrl()) {
        props.onNavigateToThreeDsAuth();
      } else {
        showToast(
          "Something went wrong",
          "It seems your card details are incorrect. Please try again.",
          "error"
        );
      }
    } else {
      showToast(
        "Fingerprint is required",
        "I can't get device fingerprint. Something went wrong",
        "error"
      );
    }
  };

  const handleXenditFingerprint = (fingerprint: string) => {
    fp.current = fingerprint;
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <AppHeaderView title="Add New Card" />
            <AddCardView onAddCard={handleAddNewCard} />
            <AppLoaderView isVisible={presenter.isLoading()} />
            <XenditFingeprintView onFingerprint={handleXenditFingerprint} />
          </View>
        );
      }}
    </Observer>
  );
};

export default AddCardContainer;
