import { ScreenNames } from "@/src/app/screen-registry";
import { StoreContext } from "@/src/app/store";
import RideController from "@/src/ride/interfaces/controllers/ride.controller";
import { CommonActions } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { showToast } from "../../utils";

interface IPushNotificationViewModel {
  children: JSX.Element;
}

const PushNotificationContainer: React.FC<IPushNotificationViewModel> = (
  props
) => {
  const navigation = useNavigation();

  const store = React.useContext(StoreContext);
  const controller = new RideController(store);

  const handleToHome = (): void => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.Drawer }],
      })
    );
  };

  React.useEffect(() => {
    // Called when a notification is received while app is foregrounded
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification Received:", notification);
      // You can update UI or state here
      if (notification.request.content.title === "Ride Ended") {
        showToast(
          "OTP Confirmation Failed",
          "Your ride has ended due to low wallet balance.",
          "info"
        );
        controller.clearCurrentRide();
        handleToHome();
      }
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification Response:", response);
      // Handle navigation or other logic on tap
    });
  }, []);

  return <View style={styles.container}>{props.children}</View>;
};

export default PushNotificationContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
