import { Colors } from "@/src/common/colors";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import BalanceEntity from "../../entities/balance.entity";
import CardEntity from "../../entities/card.entity";
import CardItemView from "../card-item/card-item.view";

interface IBalanceViewModel {
  onNavigateToTopUp: () => void;
  onAddNewCard: () => void;
  onRemoveCard: (card: CardEntity) => void;
  balanceEntity: BalanceEntity;
  cards: CardEntity[];
}

const BalanceView: React.FC<IBalanceViewModel> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Shadow
          distance={5}
          startColor={"#00000020"}
          containerStyle={styles.shadowContainer}
        >
          <View style={styles.balanceContainer}>
            <Icon source="wallet" size={35} color={Colors.primaryColor} />
            <View style={styles.balanceSubContainer}>
              <Text style={styles.balanceText}>
                Balance: {props.balanceEntity.balance} PHP
              </Text>
              <Text style={styles.topUpText}>Top up your account.</Text>
            </View>
          </View>
        </Shadow>

        <Text style={styles.paymentMethodText}>Payment Methods</Text>

        <Pressable onPress={props.onAddNewCard}>
          <Text style={styles.addPaymentMethodText}>+ Add payment method</Text>
        </Pressable>

        <FlatList
          style={{ flex: 1, marginTop: 10 }}
          data={props.cards}
          renderItem={({ item }) => (
            <CardItemView card={item} onRemoveCard={props.onRemoveCard} />
          )}
        />
      </View>

      <Button
        mode="contained"
        style={styles.topUpButton}
        onPress={props.onNavigateToTopUp}
      >
        TOP UP
      </Button>
    </View>
  );
};

export default BalanceView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
    padding: 20,
  },
  addPaymentMethodText: {
    color: Colors.primaryColor,
    marginTop: 20,
    fontWeight: "bold",
  },
  shadowContainer: {
    width: "100%",
    zIndex: 1,
    marginTop: 5,
  },
  paymentMethodText: {
    color: Colors.darkGrey,
    marginTop: 20,
  },
  balanceContainer: {
    padding: 20,
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
  },
  balanceSubContainer: {
    marginLeft: 10,
  },
  balanceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  topUpText: {
    fontSize: 12,
    color: Colors.semiDarkGrey,
  },
  topUpButton: {
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
});
