import * as Notifications from "expo-notifications";
import React from "react";
import { StyleSheet, View } from "react-native";

interface IPushNotificationViewModel {
  children: JSX.Element;
}

const PushNotificationView: React.FC<IPushNotificationViewModel> = (props) => {
  React.useEffect(() => {
    // Called when a notification is received while app is foregrounded
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification Received:", notification);
      // You can update UI or state here
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification Response:", response);
      // Handle navigation or other logic on tap
    });
  }, []);

  return <View style={styles.container}>{props.children}</View>;
};

export default PushNotificationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
