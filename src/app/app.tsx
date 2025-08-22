import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { configure } from "mobx";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, PaperProvider, Text } from "react-native-paper";
import { enableFreeze, enableScreens } from "react-native-screens";
import Toast, { ToastConfig } from "react-native-toast-message";
import CloseIcon from "../../assets/icons/close_icn.svg";
import DangerIcon from "../../assets/icons/danger_icn.svg";
import InfoIcon from "../../assets/icons/info_icn.svg";
import SuccessIcon from "../../assets/icons/success_icn.svg";
import WarningIcon from "../../assets/icons/warning_icn.svg";
import { Colors } from "../common/colors";
import Navigator from "./navigator";
import getStore, { StoreContext } from "./store";

enableScreens();
enableFreeze();

configure({
  enforceActions: "never",
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const firstStore = getStore();

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Poppins-Regular",
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: "Poppins-Regular",
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: "Poppins-Regular",
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: "Poppins-Bold",
    },
    // You can override more if needed
  },
};

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const toastConfig: ToastConfig = {
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    customToast: ({ text1, text2, props }) => {
      let color: string = "";
      let icon: any = null;
      if (props.status === "info") {
        color = Colors.lightSkyBlue;
        icon = <InfoIcon />;
      } else if (props.status === "success") {
        color = Colors.lightPastelGreen;
        icon = <SuccessIcon />;
      } else if (props.status === "warning") {
        color = Colors.lightBeige;
        icon = <WarningIcon />;
      } else {
        color = Colors.pastelPink;
        icon = <DangerIcon />;
      }

      return (
        <View
          style={[
            styles.toastContainer,
            {
              backgroundColor: color,
            },
          ]}
        >
          {icon}
          <View style={styles.subToastContainer}>
            <Text style={styles.toastTextOne}>{text1}</Text>
            <Text>{text2}</Text>
          </View>
          <CloseIcon onPress={() => Toast.hide()} />
        </View>
      );
    },
  };

  return (
    <StoreContext.Provider value={firstStore}>
      <GestureHandlerRootView style={styles.container}>
        <PaperProvider theme={theme}>
          <Navigator />
          <Toast config={toastConfig} />
        </PaperProvider>
      </GestureHandlerRootView>
    </StoreContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  toastContainer: {
    width: Dimensions.get("window").width - 100,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  subToastContainer: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: Colors.transparent,
  },
  toastTextOne: {
    fontWeight: "bold",
  },
});

export default App;
