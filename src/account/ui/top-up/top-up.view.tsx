import { Colors } from "@/src/common/colors";
import { calculateChargeAmount } from "@/src/common/utils";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Button, Text } from "react-native-paper";
import BalanceEntity from "../../entities/balance.entity";

interface ITopUpViewModel {
  balanceEntity: BalanceEntity;
  paymentMethod: string;
  onTopUp: (amount: number) => void;
  onPaymentOptions: () => void;
}

const TopUpView: React.FC<ITopUpViewModel> = (props) => {
  const [selectedOption, setSelectedOption] = React.useState<number>(200);
  let logoPath: ImageSourcePropType = require("../../../../assets/images/gcash_logo.png");
  let paymentFee: number = 0;
  const selectedStyle = (option: number): StyleProp<ViewStyle> => {
    if (selectedOption === option) {
      return {
        borderColor: Colors.primaryColor,
        borderWidth: 2,
      };
    }

    return {};
  };

  if (props.paymentMethod === "GCASH") {
    logoPath = require("../../../../assets/images/gcash_logo.png");
    paymentFee = 2.3;
  } else if (props.paymentMethod === "PAYMAYA") {
    paymentFee = 2.0;
    logoPath = require("../../../../assets/images/maya_logo.jpg");
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.balanceText}>
            {props.balanceEntity.balance} PHP
          </Text>
          <Text>Balance</Text>
        </View>

        <View>
          <Text style={styles.balanceText}>{props.balanceEntity.debt} PHP</Text>
          <Text>Debt</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.chooseAmountText}>Choose your top up amount</Text>

        <Pressable onPress={() => setSelectedOption(200)}>
          <View style={[styles.optionContainer, selectedStyle(200)]}>
            <Text style={styles.amountText}>200.00 PHP</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setSelectedOption(400)}>
          <View style={[styles.optionContainer, selectedStyle(400)]}>
            <Text style={styles.amountText}>400.00 PHP</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setSelectedOption(500)}>
          <View style={[styles.optionContainer, selectedStyle(500)]}>
            <Text style={styles.amountText}>500.00 PHP</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setSelectedOption(800)}>
          <View style={[styles.optionContainer, selectedStyle(800)]}>
            <Text style={styles.amountText}>800.00 PHP</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setSelectedOption(1000)}>
          <View style={[styles.optionContainer, selectedStyle(1000)]}>
            <Text style={styles.amountText}>1000.00 PHP</Text>
          </View>
        </Pressable>
      </View>

      <Pressable onPress={props.onPaymentOptions}>
        <View style={styles.paymentMethodContainer}>
          <Image source={logoPath} style={styles.logo} resizeMode="contain" />
          <Text style={styles.paymentMethodText}>{props.paymentMethod}</Text>
        </View>
      </Pressable>

      <Text style={styles.noteText}>
        Please note: A {paymentFee}% transaction fee will be added to your
        payment, and you will be responsible for covering this fee.
      </Text>

      <Button
        mode="contained"
        style={styles.topUpButton}
        onPress={() =>
          props.onTopUp(calculateChargeAmount(selectedOption, paymentFee / 100))
        }
      >
        CONTINUE
      </Button>
    </View>
  );
};

export default TopUpView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  optionContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginTop: 20,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
  },
  paymentMethodContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginTop: 20,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  balanceContainer: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  balanceText: {
    fontWeight: "bold",
    fontSize: 27,
  },
  topUpButton: {
    margin: 20,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
  },
  optionsContainer: {
    padding: 20,
    flex: 1,
  },
  chooseAmountText: {
    color: Colors.semiDarkGrey,
    fontSize: 14,
  },
  amountText: {
    fontWeight: "bold",
  },
  logo: {
    width: 25,
    height: 25,
  },
  noteText: {
    marginHorizontal: 20,
    fontSize: 12,
  },
  paymentMethodText: {
    fontWeight: "bold",
    marginStart: 10,
  },
});
