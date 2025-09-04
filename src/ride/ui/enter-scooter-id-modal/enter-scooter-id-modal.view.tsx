import { Colors } from "@/src/common/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Button, TextInput } from "react-native-paper";

interface IEnterScooterIdModalViewModel {
  isVisible: boolean;
  onContinue: (id: string | null) => void;
  onCloseModal: () => void;
}

const EnterScooterIdModalView: React.FC<IEnterScooterIdModalViewModel> = (
  props
) => {
  const idRef = React.useRef<string | null>(null);
  return (
    <Modal
      animationIn="pulse"
      animationOut="pulse"
      isVisible={props.isVisible}
      onBackdropPress={props.onCloseModal}
      onBackButtonPress={props.onCloseModal}
    >
      <View style={styles.container}>
        <TextInput
          label="Scooter ID"
          mode="outlined"
          onChangeText={(text) => (idRef.current = text)}
        />

        <Button
          style={{ marginTop: 15 }}
          mode="contained"
          onPress={() => props.onContinue(idRef.current)}
        >
          Continue
        </Button>
      </View>
    </Modal>
  );
};

export default EnterScooterIdModalView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
});
