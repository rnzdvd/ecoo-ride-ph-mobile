import { Colors } from "@/src/common/colors";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Drawer, Icon, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";

const DrawerView: React.FC<{
  isLoggedIn: boolean;
  onNavigateToRegistration: () => void;
  onNavigateToBalance: () => void;
}> = (props) => (
  <DrawerContentScrollView>
    {!props.isLoggedIn ? (
      <View>
        <Text style={styles.title}>Ecoo Ride PH</Text>
        <Button
          style={styles.getStartedButton}
          mode="contained"
          onPress={props.onNavigateToRegistration}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </Button>
      </View>
    ) : (
      <View>
        <View style={styles.profileContainer}>
          <Avatar.Icon size={50} icon={"account"} />
          <View style={styles.profileSubContainer}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </View>
        </View>

        <View style={styles.rideInfoContainer}>
          <View style={styles.rideInfoContainerSub}>
            <Shadow style={{ borderRadius: 10, padding: 5 }} distance={5}>
              <Icon source="scooter" size={30} color={Colors.primaryColor} />
            </Shadow>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.rideInfoLabel}>0</Text>
              <Text style={{ fontSize: 10, color: Colors.semiDarkGrey }}>
                Rides
              </Text>
            </View>
          </View>

          <View style={styles.rideInfoContainerSub}>
            <Shadow style={{ borderRadius: 10, padding: 5 }} distance={5}>
              <Icon
                source="map-marker-distance"
                size={30}
                color={Colors.primaryColor}
              />
            </Shadow>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.rideInfoLabel}>0km</Text>
              <Text style={{ fontSize: 10, color: Colors.semiDarkGrey }}>
                Distance
              </Text>
            </View>
          </View>
        </View>
      </View>
    )}

    <Drawer.Section>
      <Drawer.Item
        label="Payments"
        icon="cash"
        onPress={props.onNavigateToBalance}
      />
      <Drawer.Item label="Ride History" icon="history" />
      <Drawer.Item label="Help" icon="question" />
    </Drawer.Section>
  </DrawerContentScrollView>
);

export default DrawerView;

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  getStartedButton: {
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  getStartedText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  profileContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 20,
  },
  profileSubContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  viewProfileText: {
    fontSize: 12,
    marginTop: 5,
    color: Colors.semiDarkGrey,
  },
  rideInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  rideInfoContainerSub: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rideInfoLabel: {
    fontWeight: "bold",
  },
});
