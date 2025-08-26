import { Colors } from "@/src/common/colors";
import { walletLogos } from "@/src/common/utils";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import EwalletEntity from "../../entities/ewallet.entity";

interface IEWalletItemViewModel {
  ewallet: EwalletEntity;
  onSelectEwallet: (ewallet: EwalletEntity) => void;
}

const EWalletItemView: React.FC<IEWalletItemViewModel> = (props) => {
  const { ewallet } = props;
  return (
    <Pressable onPress={() => props.onSelectEwallet(ewallet)}>
      <View style={styles.paymentMethodContainer}>
        <Image
          source={walletLogos[ewallet.id]}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.paymentMethodText}>{ewallet.name}</Text>
      </View>
    </Pressable>
  );
};
export default EWalletItemView;

const styles = StyleSheet.create({
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
