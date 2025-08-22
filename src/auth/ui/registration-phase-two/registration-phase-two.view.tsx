import { Colors } from "@/src/common/colors";
import { formatSeconds } from "@/src/common/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

interface IRegistrationPhaseTwoViewModel {
  onOtpConfirmed: (otp: string) => void;
  emailRegistered: string;
}

const RegistrationPhaseTwoView: React.FC<IRegistrationPhaseTwoViewModel> = (
  props
) => {
  const [otp, setOtp] = React.useState<string>("");
  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(300);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interval);
          return 0;
        }

        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Verification</Text>

        <Text style={styles.descriptionText}>
          Enter the 6-digit code sent to {props.emailRegistered}
        </Text>

        <TextInput
          returnKeyType="done"
          inputMode="numeric"
          label="Verification Code"
          mode="outlined"
          style={styles.input}
          onChangeText={setOtp}
        />

        {secondsRemaining !== 0 ? (
          <Text style={styles.descriptionText}>
            Resent code in {formatSeconds(secondsRemaining)}
          </Text>
        ) : (
          <Text style={styles.resentText}>Resent Code</Text>
        )}
      </View>

      <Button
        disabled={otp.length !== 6}
        mode="contained"
        style={styles.continueButton}
        onPress={() => props.onOtpConfirmed(otp)}
      >
        CONTINUE
      </Button>
    </View>
  );
};

export default RegistrationPhaseTwoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  descriptionText: {
    color: Colors.semiDarkGrey,
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    marginTop: 50,
  },
  continueButton: {
    padding: 5,
    borderRadius: 10,
    margin: 20,
  },
  resentText: {
    color: Colors.mainBlue,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
