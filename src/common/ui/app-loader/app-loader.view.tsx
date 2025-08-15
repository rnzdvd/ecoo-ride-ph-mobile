import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";

interface IAppLoaderViewModel {
  isVisible: boolean;
}

const AppLoaderView: React.FC<IAppLoaderViewModel> = (props) => {
  const isFocused = useIsFocused();

  if (props.isVisible && isFocused) {
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={props.isVisible}
        style={styles.container}
      >
        <ActivityIndicator size="small" />
      </Modal>
    );
  }

  return null;
};

export default AppLoaderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
