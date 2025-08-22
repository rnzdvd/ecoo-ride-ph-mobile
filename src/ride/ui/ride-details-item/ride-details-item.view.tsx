import { Colors } from "@/src/common/colors";
import { formatDate, formatSeconds } from "@/src/common/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import RideEntity from "../../entities/ride.entity";

interface IRideDetailsItemViewModel {
  ride: RideEntity;
}

const RideDetailsItemView: React.FC<IRideDetailsItemViewModel> = (props) => {
  const { ride } = props;
  return (
    <Shadow
      distance={5}
      startColor={"#00000020"}
      containerStyle={styles.shadowContainer}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.scooterNameText}>{ride.scooterName}</Text>

          <Text style={styles.startedAtText}>{formatDate(ride.startedAt)}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.subStatsContainer}>
              <Icon source="scooter" size={15} color={Colors.primaryColor} />
              <Text style={styles.statText}>{ride.totalDistance} KM</Text>
            </View>

            <View style={styles.subStatsContainer}>
              <Icon source="clock" size={15} color={Colors.primaryColor} />

              <Text style={styles.statText}>
                {formatSeconds(ride.totalDuration)} mins
              </Text>
            </View>

            <View style={styles.subStatsContainer}>
              <Icon source="wallet" size={15} color={Colors.primaryColor} />
              <Text style={styles.statText}>₱{ride.totalCharged}</Text>
            </View>
          </View>
        </View>
      </View>
    </Shadow>
  );
};

export default RideDetailsItemView;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 5,
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  shadowContainer: {
    zIndex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  subContainer: {
    flex: 1,
  },
  scooterNameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  startedAtText: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  subStatsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginEnd: 15,
  },
  statText: {
    fontWeight: "bold",
    fontSize: 12,
    marginStart: 5,
  },
});
