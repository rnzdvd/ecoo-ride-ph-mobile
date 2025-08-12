import { registerForPushNotificationsAsync } from "@/src/common/notification-services";
import { Observer } from "mobx-react-lite";
import React from "react";
import SplashView from "./splash.view";

const SplashContainer: React.FC<{
  onNavigateToHome: () => void;
}> = (props) => {
  React.useEffect(() => {
    callPushNotifications();
    const timeoutId = setTimeout(props.onNavigateToHome, 2000);
    return () => clearTimeout(timeoutId);
  });

  const callPushNotifications = async (): Promise<void> => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      console.log("Push token from splash:", token);
      // Save/send token to your backend here if needed
    }
  };

  return (
    <Observer>
      {() => {
        return <SplashView />;
      }}
    </Observer>
  );
};

export default SplashContainer;
