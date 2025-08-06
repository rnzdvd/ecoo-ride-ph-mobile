import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";

interface IBalanceViewModel {
  onNavigateToTopUp: () => void;
}

const BalanceView: React.FC<IBalanceViewModel> = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: Colors.darkGrey,
            marginTop: 20,
          }}
        >
          Payment Methods
        </Text>

        <Text
          style={{
            color: Colors.primaryColor,
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          + Add payment method
        </Text>
        <Shadow
          distance={1}
          startColor={"#00000020"}
          containerStyle={{ width: "100%", zIndex: 1, marginTop: 40 }}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              width: "100%",
              borderRadius: 10,
            }}
          >
            <Icon source="wallet" size={35} color={Colors.primaryColor} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Balance: 0.00 PHP
              </Text>
              <Text style={{ fontSize: 12, color: Colors.semiDarkGrey }}>
                Top up your account.
              </Text>
            </View>
          </View>
        </Shadow>
      </View>

      <Button
        mode="contained"
        style={{
          padding: 5,
          borderRadius: 10,
          margin: 16,
        }}
        onPress={props.onNavigateToTopUp}
      >
        Top up
      </Button>
    </View>
  );
};

export default BalanceView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
});
