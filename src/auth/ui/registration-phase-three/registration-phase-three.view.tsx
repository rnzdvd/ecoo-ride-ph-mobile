import { Colors } from "@/src/common/colors";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";

export interface IRegistrationFormModel {
  email: string;
  full_name: string;
  phone_number: string;
}

interface IRegistrationPhaseThreeViewModel {
  onConfirm: (form: IRegistrationFormModel) => void;
  registeredEmail: string;
}

const RegistrationPhaseThreeView: React.FC<IRegistrationPhaseThreeViewModel> = (
  props
) => {
  const formvalue: IRegistrationFormModel = {
    email: props.registeredEmail,
    full_name: "",
    phone_number: "",
  };

  return (
    <Formik
      validateOnMount
      validationSchema={Schema}
      initialValues={formvalue}
      onSubmit={props.onConfirm}
    >
      {({ setFieldValue, handleSubmit, values, isValid }) => (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.subContainer}>
              <Text style={styles.titleText}>Profile Details</Text>

              <Text style={styles.descriptionText}>
                Please fill in your profile details to proceed
              </Text>

              <Avatar.Icon
                size={70}
                icon="account"
                style={styles.accountIcon}
              />

              <TextInput
                label="Full Name"
                mode="outlined"
                style={styles.fullNameInput}
                value={values.full_name}
                onChangeText={(text) => setFieldValue("full_name", text)}
              />

              <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                disabled
                value={values.email}
              />

              <TextInput
                returnKeyType="done"
                inputMode="numeric"
                label="Phone Number"
                mode="outlined"
                style={styles.input}
                value={values.phone_number}
                maxLength={10}
                left={
                  <TextInput.Icon
                    icon={() => <Text style={styles.countryCodeText}>+63</Text>}
                  />
                }
                onChangeText={(text) => setFieldValue("phone_number", text)}
              />
            </View>
          </ScrollView>

          <Button
            disabled={!isValid}
            mode="contained"
            style={styles.continueButton}
            onPress={() => handleSubmit()}
          >
            CONTINUE
          </Button>
        </View>
      )}
    </Formik>
  );
};

const Schema = Yup.object().shape({
  email: Yup.string().required(),
  full_name: Yup.string().required(),
  phone_number: Yup.string().required(),
});

export default RegistrationPhaseThreeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
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
    margin: 20,
  },
  subContainer: {
    flex: 1,
    padding: 20,
  },
  countryCodeText: {
    fontSize: 16,
  },
});
