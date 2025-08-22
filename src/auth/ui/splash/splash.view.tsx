import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const SplashView: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Ecoo Ride PH</Text>
      </View>
      <ActivityIndicator color={Colors.white} style={styles.indicator} />
    </View>
  );
};

export default SplashView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  indicator: {
    marginBottom: 20,
  },
});
