import { luhnCheck } from "@/src/common/utils";
import { Formik, FormikProps } from "formik";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Icon, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";

interface IAddCardViewModel {
  onAddCard: (card: ICardFormModel) => void;
}

export interface ICardFormModel {
  card_number: string;
  card_holder_first_name: string;
  card_holder_last_name: string;
  expiry_date: string;
  cvv: string;
}

const AddCardView: React.FC<IAddCardViewModel> = (props) => {
  const formikRef = React.useRef<FormikProps<ICardFormModel>>(null);
  const formvalue: ICardFormModel = {
    card_number: "",
    card_holder_first_name: "",
    card_holder_last_name: "",
    expiry_date: "",
    cvv: "",
  };

  const formatExpiryDate = (date: string) => {
    let value = date.replace(/\D/g, "");

    if (value.length === 1 && parseInt(value) > 1) {
      value = "0" + value;
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    formikRef.current?.setFieldValue("expiry_date", value);
  };

  const formatCardNumber = (value: string) => {
    let digits = value.replace(/\D/g, "");
    const maxDigits = 16;
    if (digits.length > maxDigits) digits = digits.slice(0, maxDigits);
    // Format with spaces every 4 digits
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    formikRef.current?.setFieldValue("card_number", formatted);
  };

  const getCardBrand = (
    cardNumber: string
  ): "visa" | "mastercard" | "jcb" | "amex" | "" => {
    const digits = cardNumber.replace(/\D/g, "");
    let cardType: "visa" | "mastercard" | "jcb" | "amex" | "" = "";
    if (/^4/.test(digits)) cardType = "visa";

    // Mastercard: 51–55 or 2221–2720
    if (/^(5[1-5]|22[2-9]|2[3-7][0-9])/.test(digits)) cardType = "mastercard";

    if (/^3[47]/.test(digits)) cardType = "amex";
    if (/^35/.test(digits)) cardType = "jcb";

    return cardType;
  };

  const displayCardBrand = (cardNumber: string): React.ReactNode => {
    const brand = getCardBrand(cardNumber);

    return (
      <TextInput.Icon
        icon={() => {
          switch (brand) {
            case "visa":
              return (
                <Image
                  source={require("@/assets/images/visa_logo.png")}
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                />
              );
            case "mastercard":
              return (
                <Image
                  source={require("@/assets/images/master_card.png")}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              );
            case "amex":
              return (
                <Image
                  source={require("@/assets/images/amex_logo.jpg")}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              );
            case "jcb":
              return (
                <Image
                  source={require("@/assets/images/jcb_logo.jpg")}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              );
            default:
              return <Icon source="card" size={24} />;
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        innerRef={formikRef}
        validateOnMount
        validationSchema={Schema}
        initialValues={formvalue}
        onSubmit={props.onAddCard}
      >
        {({ setFieldValue, handleSubmit, values, isValid, errors }) => {
          return (
            <View style={styles.container}>
              <ScrollView>
                <View style={styles.subContainer}>
                  <TextInput
                    style={{ marginTop: 10 }}
                    label="Card Holder First Name"
                    mode="outlined"
                    value={values.card_holder_first_name}
                    onChangeText={(text) =>
                      setFieldValue("card_holder_first_name", text)
                    }
                  />

                  <TextInput
                    style={{ marginTop: 10 }}
                    label="Card Holder Last Name"
                    mode="outlined"
                    value={values.card_holder_last_name}
                    onChangeText={(text) =>
                      setFieldValue("card_holder_last_name", text)
                    }
                  />

                  <TextInput
                    placeholder="1234 5678 9012 3456"
                    inputMode="numeric"
                    style={{ marginTop: 10 }}
                    label="Card Number"
                    mode="outlined"
                    value={values.card_number}
                    onChangeText={formatCardNumber}
                    maxLength={19}
                    error={!!errors.card_number}
                    left={displayCardBrand(values.card_number)}
                  />

                  {errors.card_number && (
                    <Text style={{ color: "red", marginTop: 5 }}>
                      {errors.card_number as string}
                    </Text>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <TextInput
                      maxLength={3}
                      inputMode="numeric"
                      style={{ flex: 1, marginRight: 15 }}
                      label="CVV"
                      mode="outlined"
                      value={values.cvv}
                      onChangeText={(text) => setFieldValue("cvv", text)}
                    />

                    <TextInput
                      inputMode="numeric"
                      style={{ flex: 1 }}
                      label="Expiry Date (MM/YY)"
                      mode="outlined"
                      maxLength={5}
                      value={values.expiry_date}
                      onChangeText={formatExpiryDate}
                    />
                  </View>
                </View>
              </ScrollView>

              <Button
                disabled={!isValid}
                mode="contained"
                style={styles.continueButton}
                onPress={() => handleSubmit()}
              >
                ADD NEW CARD
              </Button>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const Schema = Yup.object().shape({
  card_number: Yup.string()
    .required("")
    .matches(/^[\d\s]{13,19}$/, "Card number must be 13-19 digits")
    .test("luhn-check", "Invalid card number", (value) => {
      if (!value) return false;
      const digitsOnly = value.replace(/\s/g, "");
      return luhnCheck(digitsOnly);
    }),
  card_holder_first_name: Yup.string().required(),
  card_holder_last_name: Yup.string().required(),
  expiry_date: Yup.string().required().min(5),
  cvv: Yup.string().required().min(3),
});

export default AddCardView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  continueButton: {
    padding: 5,
    borderRadius: 10,
    margin: 20,
  },
  subContainer: {
    flex: 1,
    padding: 20,
  },
});
