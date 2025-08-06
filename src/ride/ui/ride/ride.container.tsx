import InfoModalView from "@/src/common/ui/info-modal/info-modal.view";
import * as ImagePicker from "expo-image-picker";
import { Observer } from "mobx-react-lite";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import RideView from "./ride.view";

const RideContainer: React.FC<{
  onNavigateToHome: () => void;
}> = (props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const openCamera = async (): Promise<void> => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setShowModal(false);
      handleEndRide(uri);
    }
  };

  const handleEndRide = async (uri: string): Promise<void> => {
    props.onNavigateToHome();
    Toast.show({ text1: "Ride Ended Successfully", type: "success" });
  };

  return (
    <Observer>
      {() => {
        return (
          <View style={{ flex: 1 }}>
            <RideView onRideEnd={() => setShowModal(true)} />
            <InfoModalView isVisible={showModal} onButtonClicked={openCamera} />
          </View>
        );
      }}
    </Observer>
  );
};

export default RideContainer;
