import { Colors } from "@/src/common/colors";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";

interface IRideInstructionsViewModel {
  onStartRide: () => void;
}

const RideInstructionsView: React.FC<IRideInstructionsViewModel> = (props) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.rideInstructionsContainer}>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 50,
            color: Colors.primaryColor,
          }}
        >
          Know before you ride:
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../../../assets/images/no_double_riding.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require("../../../../assets/images/no_minors.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Image
            source={require("../../../../assets/images/wear_helmet.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require("../../../../assets/images/use_pmd_lanes.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", margin: 20 }}>
        <Checkbox.Android
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={{ marginRight: 20, marginLeft: 10 }}>
          I&apos;m responsible for my own helmet & agree to comply to all rules.
        </Text>
      </View>

      <Button
        disabled={!checked}
        mode="contained"
        onPress={props.onStartRide}
        style={styles.startRideButton}
      >
        Start Ride
      </Button>
    </View>
  );
};

export default RideInstructionsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rideInstructionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startRideButton: {
    margin: 30,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 130,
    height: 130,
    marginHorizontal: 20,
  },
});
