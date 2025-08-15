import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

interface IRegistrationPhaseOneViewModel {
  onRequestOtp: (email: string) => void;
}

const RegistrationPhaseOneView: React.FC<IRegistrationPhaseOneViewModel> = (
  props
) => {
  const [email, setEmail] = React.useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Get Started</Text>

        <Text style={styles.descriptionText}>
          Please type your email address to get started
        </Text>

        <TextInput
          label="Email Address"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
      </View>

      <Button
        disabled={!email}
        mode="contained"
        style={styles.continueButton}
        onPress={() => props.onRequestOtp(email)}
      >
        CONTINUE
      </Button>
    </View>
  );
};

export default RegistrationPhaseOneView;

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
