import { Colors } from "@/src/common/colors";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";

interface IPaymentOptionsViewModel {
  onSelectPaymentMethod: (paymentMethod: string) => void;
}

const PaymentOptionsView: React.FC<IPaymentOptionsViewModel> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => props.onSelectPaymentMethod("GCASH")}
      >
        <View style={styles.paymentMethodContainer}>
          <Image
            source={require("../../../../assets/images/gcash_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.paymentMethodText}>GCASH</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => props.onSelectPaymentMethod("PAYMAYA")}
      >
        <View style={styles.paymentMethodContainer}>
          <Image
            source={require("../../../../assets/images/maya_logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.paymentMethodText}>PAYMAYA</Text>
        </View>
      </TouchableWithoutFeedback>
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
