import { Colors } from "@/src/common/colors";
import { useIsFocused } from "@react-navigation/native";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

interface IScanViewModel {
  onScanSuccess: (data: string) => void;
  onEnterScooterId: () => void;
}

const { width } = Dimensions.get("window");
const scanBoxSize = width * 0.6;

const ScanView: React.FC<IScanViewModel> = (props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!permission || permission.status !== "granted") {
      requestPermission();
    }
  });

  const handleBarCodeScanned = (data: BarcodeScanningResult): void => {
    if (data?.data) {
      props.onScanSuccess(data.data);
    }
  };

  if (!permission?.granted) {
    return <Text>Waiting for camera permission...</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      )}

      <View style={styles.overlay}>
        <Text style={styles.descriptionText}>Scan the QR code to unlock</Text>
        <View style={styles.square} />
      </View>

      <View style={styles.enterCodeContainer}>
        <Text style={styles.descriptionText}>OR</Text>
        <Text style={styles.descriptionText}>
          Enter the vehicle QR code to unlock
        </Text>

        <Button
          style={styles.enterCodeButton}
          mode="contained"
          onPress={props.onEnterScooterId}
        >
          <Text style={styles.enterCodeText}>Enter Code</Text>
        </Button>
      </View>
    </View>
  );
};

export default ScanView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    marginTop: 100,
  },
  square: {
    width: scanBoxSize,
    height: scanBoxSize,
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  descriptionText: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
  enterCodeContainer: {
    position: "absolute",
    margin: 20,
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  enterCodeButton: {
    padding: 10,
    borderRadius: 10,
  },
  enterCodeText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
