import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Text, TextInput } from "react-native-paper";

interface IRegistrationPhaseThreeViewModel {
  onConfirm: () => void;
}

const RegistrationPhaseThreeView: React.FC<IRegistrationPhaseThreeViewModel> = (
  props
) => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Profile Details</Text>

        <Text style={styles.descriptionText}>
          Please fill in your profile details to proceed
        </Text>

        <Avatar.Icon size={70} icon="account" style={styles.accountIcon} />

        <TextInput
          label="Full Name"
          mode="outlined"
          style={styles.fullNameInput}
        />

        <TextInput label="Email" mode="outlined" style={styles.input} />

        <TextInput
          returnKeyType="done"
          inputMode="numeric"
          label="Phone Number"
          mode="outlined"
          style={styles.input}
        />
      </View>
    </ScrollView>

    <Button
      mode="contained"
      style={styles.continueButton}
      onPress={props.onConfirm}
    >
      CONTINUE
    </Button>
  </View>
);

export default RegistrationPhaseThreeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.white,
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
  accountIcon: {
    marginTop: 40,
    alignSelf: "center",
  },
  fullNameInput: {
    marginTop: 50,
  },
  input: {
    marginTop: 25,
  },
  continueButton: {
    padding: 5,
    borderRadius: 10,
  },
  subContainer: {
    flex: 1,
  },
});
