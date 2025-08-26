import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CardEntity from "../../entities/card.entity";
import EwalletEntity from "../../entities/ewallet.entity";
import CardItemView from "../card-item/card-item.view";
import EWalletItemView from "../e-wallet-item/e-wallet-item.view";

interface IPaymentOptionsViewModel {
  onSelectPaymentMethod: (paymentMethod: EwalletEntity | CardEntity) => void;
  paymentOptions: (EwalletEntity | CardEntity)[];
}

const PaymentOptionsView: React.FC<IPaymentOptionsViewModel> = (props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.paymentOptions}
        renderItem={({ item }) => {
          if (item instanceof EwalletEntity) {
            return (
              <EWalletItemView
                ewallet={item}
                onSelectEwallet={props.onSelectPaymentMethod}
              />
            );
          } else {
            return (
              <CardItemView
                card={item}
                onSelectCard={props.onSelectPaymentMethod}
              />
            );
          }
        }}
      />
    </View>
  );
};

export default PaymentOptionsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  paymentMethodContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 25,
    height: 25,
  },
  paymentMethodText: {
    fontWeight: "bold",
    marginStart: 10,
  },
});
