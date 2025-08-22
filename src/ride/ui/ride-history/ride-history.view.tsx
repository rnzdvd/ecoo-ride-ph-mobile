import { Colors } from "@/src/common/colors";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import RideEntity from "../../entities/ride.entity";
import RideDetailsItemView from "../ride-details-item/ride-details-item.view";

interface IRideHistoryViewModel {
  rideHistory: RideEntity[];
}

const RideHistoryView: React.FC<IRideHistoryViewModel> = (props) => {
  return (
    <View style={styles.container}>
      {props.rideHistory.length > 0 ? (
        <FlatList
          data={props.rideHistory}
          renderItem={({ item }) => <RideDetailsItemView ride={item} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      ) : (
        <View style={styles.noRideHistoryContainer}>
          <Text>No ride history available.</Text>
        </View>
      )}
    </View>
  );
};

export default RideHistoryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  noRideHistoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
