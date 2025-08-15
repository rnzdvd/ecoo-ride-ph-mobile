import { Colors } from "@/src/common/colors";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Text,
} from "react-native-paper";
import ScooterEntity from "../../entities/scooter.entity";

interface IHomeViewModel {
  onOpenDrawer: () => void;
  onScanQR: () => void;
  onGetStarted: () => void;
  isLoggedIn: boolean;
  scooters: ScooterEntity[];
}

const HomeView: React.FC<IHomeViewModel> = (props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      await requestCameraPermission();

      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
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
      <MapView
        showsUserLocation
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {props.scooters.map((scooter) => {
          return (
            <Marker
              key={scooter.id}
              coordinate={{
                latitude: scooter.lat,
                longitude: scooter.lng,
              }}
            >
              <Icon source={"scooter"} size={25} color={Colors.primaryColor} />

              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.title}>{scooter.name}</Text>
                  <Text style={styles.subtitle}>
                    Battery: {scooter.battery}%
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.menuContainer}>
        <IconButton
          icon="menu" // or "menu", "email", etc.
          size={30}
          onPress={props.onOpenDrawer}
        />
      </View>

      {!props.isLoggedIn ? (
        <Button
          style={styles.getStartedButton}
          mode="contained"
          onPress={props.onGetStarted}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </Button>
      ) : (
        <Button
          style={styles.getStartedButton}
          onPress={props.onScanQR}
          mode="contained"
        >
          <View style={styles.scanContainer}>
            <Icon source="camera" size={20} color={Colors.white} />
            <Text style={styles.scanText}>SCAN</Text>
          </View>
        </Button>
      )}
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  getStartedButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  getStartedText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  scanText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanContainer: {
    flexDirection: "row",
  },
  calloutContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    minWidth: 120,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
  },
});
