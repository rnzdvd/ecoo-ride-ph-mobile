import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text } from "react-native-paper";
import { Colors } from "../../colors";

interface IInfoModalViewModel {
  isVisible: boolean;
  onCloseModal: () => void;
  onButtonClicked: () => void;
}

const InfoModalView: React.FC<IInfoModalViewModel> = (props) => (
  <Modal
    animationIn="pulse"
    animationOut="pulse"
    isVisible={props.isVisible}
    onBackdropPress={props.onCloseModal}
    onBackButtonPress={props.onCloseModal}
  >
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Please Take a photo of the scooter and make sure its locked and parked
        in designated parking area
      </Text>

      <Button
        mode="contained"
        onPress={props.onButtonClicked}
        style={styles.takePhotoButton}
      >
        Take Photo
      </Button>
    </View>
  </Modal>
);

export default InfoModalView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  descriptionText: {
    fontSize: 17,
    textAlign: "center",
  },
  takePhotoButton: {
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
  },
});
