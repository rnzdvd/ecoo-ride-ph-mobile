import { Colors } from "@/src/common/colors";
import { formatSeconds } from "@/src/common/utils";
import ScooterEntity from "@/src/home/entities/scooter.entity";
import * as Location from "expo-location";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import {
  ActivityIndicator,
  Button,
  Icon,
  Surface,
  Text,
} from "react-native-paper";
import RideEntity from "../../entities/ride.entity";

interface IRideViewModel {
  onRideEnd: () => void;
  rideEntity: RideEntity;
  scooterEntity: ScooterEntity;
}

const RideView: React.FC<IRideViewModel> = (props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  console.log("rideEntity", props.rideEntity.totalDuration);
  const [loading, setLoading] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(props.rideEntity.totalDuration);
  const timerRef = useRef<number | null>(null);

  React.useEffect(() => {
    checkLocationPermission();
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const checkLocationPermission = async (): Promise<void> => {
    const currentLocation = await Location.getCurrentPositionAsync({});

    if (!location) {
      setLocation(currentLocation);
      setLoading(false);
    }
  };

  const startTimer = (): void => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const { latitude, longitude } = location.coords;
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          showsUserLocation
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        />
      </View>

      <View style={styles.rideInfoContainer}>
        <View style={styles.subRideInfoContainer}>
          <View style={styles.rideInfoContainerSub}>
            <Surface elevation={1} style={styles.iconContainer}>
              <Icon
                source="map-marker-distance"
                size={30}
                color={Colors.primaryColor}
              />
            </Surface>
            <View style={styles.rideInfoTextContainer}>
              <Text style={styles.rideInfoLabel}>0 km</Text>
              <Text style={styles.rideInfoText}>Distance</Text>
            </View>
          </View>

          <View style={styles.rideInfoContainerSub}>
            <Surface elevation={1} style={styles.iconContainer}>
              <Icon
                source="clock-time-four-outline"
                size={30}
                color={Colors.primaryColor}
              />
            </Surface>
            <View style={styles.rideInfoTextContainer}>
              <Text style={styles.rideInfoLabel}>{formatSeconds(timer)}</Text>
              <Text style={styles.rideInfoText}>Time</Text>
            </View>
          </View>
        </View>

        <View style={styles.scooterInfoContainer}>
          <View style={styles.scooterIconContainer}>
            <Surface elevation={1} style={styles.scooterIconSurface}>
              <Icon source="scooter" size={40} />
            </Surface>
          </View>

          <View style={styles.scooterNameContainer}>
            <View style={styles.subScooterNameContainer}>
              <Text style={styles.scooterNameText}>
                {props.scooterEntity.name}
              </Text>
              <View style={styles.batteryDetailsContainer}>
                <View style={styles.batteryIconContainer}>
                  <Icon source={"battery-high"} size={15} />
                </View>
                <Text style={styles.scooterBatterLevelText}>
                  {props.scooterEntity.battery}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.endRideButtonContainer}>
          <Button
            style={styles.endRideButton}
            mode="contained"
            onPress={props.onRideEnd}
          >
            END RIDE
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RideView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
  rideInfoContainer: {
    flex: 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    padding: 20,
  },
  mapContainer: {
    flex: 1.5,
  },
  rideInfoContainerSub: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rideInfoLabel: {
    fontWeight: "bold",
  },
  subRideInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  rideInfoTextContainer: {
    marginLeft: 10,
  },
  rideInfoText: {
    color: Colors.semiDarkGrey,
    fontSize: 12,
  },
  scooterInfoContainer: {
    marginTop: 35,
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  scooterIconSurface: {
    backgroundColor: Colors.white,
    zIndex: 1,
    borderRadius: 10,
    padding: 5,
  },
  scooterNameContainer: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginLeft: -15,
  },
  subScooterNameContainer: {
    marginLeft: 20,
  },
  scooterNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  scooterBatterLevelText: {
    color: Colors.white,
    marginLeft: 5,
    fontSize: 10,
  },
  endRideButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  endRideButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
  },
  scooterIconContainer: {
    zIndex: 1,
  },
  batteryDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  batteryIconContainer: {
    padding: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
});
