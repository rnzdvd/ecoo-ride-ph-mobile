import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../colors";

interface IAppHeaderViewModel {
  title: string;
  onBack?: () => void;
}

const AppHeaderView: React.FC<IAppHeaderViewModel> = (props) => {
  const navigation = useNavigation();
  return (
    <Shadow
      distance={10}
      startColor={"#00000020"}
      containerStyle={styles.shadowContainer}
      sides={{ top: false, start: false, end: false, bottom: true }} // bottom only
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconButton
            icon="arrow-left-thin"
            size={30}
            onPress={navigation.goBack}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.spacer} />
      </View>
    </Shadow>
  );
};

export default AppHeaderView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    width: 50, // same as icon width for symmetry
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  shadowContainer: {
    width: "100%",
    zIndex: 1,
  },
});
