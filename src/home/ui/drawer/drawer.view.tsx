import AuthUserEntity from "@/src/auth/entities/auth-user.entity";
import UserStatsEntity from "@/src/auth/entities/user-stats.entity";
import { Colors } from "@/src/common/colors";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Drawer, Icon, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";

const DrawerView: React.FC<{
  isLoggedIn: boolean;
  authUser: AuthUserEntity;
  userStats: UserStatsEntity;
  onNavigateToRegistration: () => void;
  onNavigateToBalance: () => void;
  onUserLogout: () => void;
  onNavigateToRideHistory: () => void;
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
            <Text style={styles.name}>{props.authUser.fullName}</Text>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </View>
        </View>

        <View style={styles.rideInfoContainer}>
          <View style={styles.rideInfoContainerSub}>
            <Shadow style={styles.shadowIconContainer} distance={5}>
              <Icon source="scooter" size={30} color={Colors.primaryColor} />
            </Shadow>
            <View style={styles.totalRidesContainer}>
              <Text style={styles.rideInfoLabel}>
                {props.userStats.totalRides}
              </Text>
              <Text style={styles.rideTextLabel}>Rides</Text>
            </View>
          </View>

          <View style={styles.rideInfoContainerSub}>
            <Shadow style={styles.shadowIconContainer} distance={5}>
              <Icon
                source="map-marker-distance"
                size={30}
                color={Colors.primaryColor}
              />
            </Shadow>
            <View style={styles.totalRidesContainer}>
              <Text style={styles.rideInfoLabel}>
                {props.userStats.totalDistance}km
              </Text>
              <Text style={styles.rideTextLabel}>Distance</Text>
            </View>
          </View>
        </View>
      </View>
    )}

    <Drawer.Section>
      {props.isLoggedIn && (
        <>
          <Drawer.Item
            label="Payments"
            icon="cash"
            onPress={props.onNavigateToBalance}
          />

          <Drawer.Item
            label="Ride History"
            icon="history"
            onPress={props.onNavigateToRideHistory}
          />
        </>
      )}
      <Drawer.Item label="Help" icon="cloud-question" />
      {props.isLoggedIn && (
        <Drawer.Item
          theme={{ colors: { onSurfaceVariant: "#e11d48" } }}
          label="Logout"
          icon={"logout"}
          onPress={props.onUserLogout}
        />
      )}
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
  shadowIconContainer: {
    borderRadius: 10,
    padding: 5,
  },
  totalRidesContainer: {
    marginLeft: 10,
  },
  rideTextLabel: {
    fontSize: 10,
    color: Colors.semiDarkGrey,
  },
});
