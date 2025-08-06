import { Colors } from "@/src/common/colors";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Text,
} from "react-native-paper";

interface IHomeViewModel {
  onOpenDrawer: () => void;
  onScanQR: () => void;
  onGetStarted: () => void;
  isLoggedIn: boolean;
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
        {/* <Marker
          coordinate={{ latitude: 7.1907, longitude: 125.4553 }}
          title="Davao City"
        /> */}
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
});
