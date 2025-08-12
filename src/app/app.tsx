import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { configure } from "mobx";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { enableFreeze, enableScreens } from "react-native-screens";
import Toast, {
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
} from "react-native-toast-message";
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
    success: (props: BaseToastProps) => (
      <SuccessToast {...props} text2NumberOfLines={3} />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast {...props} text2NumberOfLines={3} />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast {...props} text2NumberOfLines={3} />
    ),
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
});

export default App;
