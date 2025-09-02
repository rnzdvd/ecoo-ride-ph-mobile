import React, { JSX } from "react";
import {
  ColorValue,
  KeyboardAvoidingView,
  Platform,
  StatusBarStyle,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBarView from "./custom-status-bar.view";

interface IContainerViewModel {
  children: JSX.Element;
  barStyle: StatusBarStyle;
  statusBarBg: ColorValue;
  enableAvoidingView?: boolean;
}

const Container: React.FC<IContainerViewModel> = (props) => (
  <View style={styles.container}>
    <CustomStatusBarView
      barStyle={props.barStyle}
      backgroundColor={props.statusBarBg}
    />

    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: props.statusBarBg,
          },
        ]}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // or 'position'
          enabled={Platform.OS === "ios" && props.enableAvoidingView}
        >
          {props.children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  </View>
);

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
