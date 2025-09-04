import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import AuthUserEntity from "../../entities/auth-user.entity";
import UserStatsEntity from "../../entities/user-stats.entity";

interface IViewProfileViewModel {
  user: AuthUserEntity;
  userStat: UserStatsEntity;
}

const ViewProfileView: React.FC<IViewProfileViewModel> = (props) => {
  const { user, userStat } = props;
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Avatar.Icon size={100} icon={"account"} style={styles.icon} />
        <Text style={styles.name}>{user.fullName}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View>
          <Text style={styles.statsText}>{userStat.totalRides}</Text>
          <Text>Total Rides</Text>
        </View>

        <View>
          <Text style={styles.statsText}>{userStat.totalDistance}km</Text>
          <Text>Total Distance</Text>
        </View>
      </View>

      <View style={styles.personalInfoContainer}>
        <Text style={styles.personalInfoText}>Personal Information</Text>

        <View style={styles.subPersonalInfoContainer}>
          <Text style={{ color: Colors.darkGrey }}>Email</Text>

          <View style={styles.personalInfoTextContainer}>
            <Text>{user.email}</Text>
          </View>
        </View>

        <View style={styles.subPersonalInfoContainer}>
          <Text style={{ color: Colors.darkGrey }}>Mobile Number</Text>

          <View style={styles.personalInfoTextContainer}>
            <Text>{user.phoneNumber}</Text>
          </View>
        </View>
      </View>

      <Button mode="contained" icon="delete" buttonColor="red">
        Delete Account
      </Button>
    </View>
  );
};

export default ViewProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
  },
  statsContainer: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  statsText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  personalInfoContainer: {
    marginTop: 30,
    flex: 1,
  },
  personalInfoText: {
    fontWeight: "bold",
  },
  subPersonalInfoContainer: {
    marginTop: 20,
  },
  personalInfoTextContainer: {
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.dirtyWhite,
  },
  icon: {
    marginTop: 20,
  },
});
