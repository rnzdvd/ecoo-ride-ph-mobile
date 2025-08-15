import { Colors } from "@/src/common/colors";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Button, Text } from "react-native-paper";
import BalanceEntity from "../../entities/balance.entity";

interface ITopUpViewModel {
  balanceEntity: BalanceEntity;
}

const TopUpView: React.FC<ITopUpViewModel> = (props) => {
  const [selectedOption, setSelectedOption] = React.useState<number>(200);

  const selectedStyle = (option: number): StyleProp<ViewStyle> => {
    if (selectedOption === option) {
      return {
        borderColor: Colors.primaryColor,
        borderWidth: 2,
      };
    }

    return {};
  };

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

      <View style={{ padding: 20, marginTop: 40, flex: 1 }}>
        <Text style={{ color: Colors.semiDarkGrey, fontSize: 14 }}>
          Choose your top up amount
        </Text>

        <TouchableWithoutFeedback onPress={() => setSelectedOption(200)}>
          <View style={[styles.optionContainer, selectedStyle(200)]}>
            <Text style={{ fontWeight: "bold" }}>200.00 PHP</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setSelectedOption(400)}>
          <View style={[styles.optionContainer, selectedStyle(400)]}>
            <Text style={{ fontWeight: "bold" }}>400.00 PHP</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setSelectedOption(500)}>
          <View style={[styles.optionContainer, selectedStyle(500)]}>
            <Text style={{ fontWeight: "bold" }}>500.00 PHP</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setSelectedOption(800)}>
          <View style={[styles.optionContainer, selectedStyle(800)]}>
            <Text style={{ fontWeight: "bold" }}>800.00 PHP</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setSelectedOption(1000)}>
          <View style={[styles.optionContainer, selectedStyle(1000)]}>
            <Text style={{ fontWeight: "bold" }}>1000.00 PHP</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Text style={{ marginHorizontal: 20, fontSize: 12 }}>
        Please note: A 2.3% transaction fee will be added to your payment, and
        you will be responsible for covering this fee.
      </Text>

      <Button mode="contained" style={styles.topUpButton}>
        TOP UP
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
  balanceContainer: {
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  balanceText: {
    fontWeight: "bold",
    fontSize: 27,
  },
  topUpButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
  },
});
