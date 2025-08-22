import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import BalanceEntity from "../../entities/balance.entity";

interface IBalanceViewModel {
  onNavigateToTopUp: () => void;
  balanceEntity: BalanceEntity;
}

const BalanceView: React.FC<IBalanceViewModel> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.paymentMethodText}>Payment Methods</Text>

        <Text style={styles.addPaymentMethodText}>+ Add payment method</Text>
        <Shadow
          distance={1}
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
    marginTop: 40,
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
