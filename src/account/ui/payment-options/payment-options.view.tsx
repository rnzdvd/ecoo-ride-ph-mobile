import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface IPaymentOptionsViewModel {
  optional?: any;
}

const PaymentOptionsView: React.FC<IPaymentOptionsViewModel> = (props) => {
  return (
    <View style={styles.container}>
      <Text>payment-options</Text>
    </View>
  );
};

export default PaymentOptionsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
