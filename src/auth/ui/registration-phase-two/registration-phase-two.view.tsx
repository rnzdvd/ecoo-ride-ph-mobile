import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

interface IRegistrationPhaseTwoViewModel {
  onOtpConfirmed: () => void;
}

const RegistrationPhaseTwoView: React.FC<IRegistrationPhaseTwoViewModel> = (
  props
) => (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <Text style={styles.titleText}>Verification</Text>

      <Text style={styles.descriptionText}>
        Enter the 6-digit code sent to renz.dapigan@gmail.com
      </Text>

      <TextInput
        returnKeyType="done"
        inputMode="numeric"
        label="Verification Code"
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.descriptionText}>Resent code in 60s</Text>
    </View>

    <Button
      mode="contained"
      style={styles.continueButton}
      onPress={props.onOtpConfirmed}
    >
      CONTINUE
    </Button>
  </View>
);

export default RegistrationPhaseTwoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 70,
  },
  descriptionText: {
    color: Colors.semiDarkGrey,
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    marginTop: 50,
  },
  continueButton: {
    padding: 5,
    borderRadius: 10,
  },
});
