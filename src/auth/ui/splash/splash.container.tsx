import { StoreContext } from "@/src/app/store";
import { registerForPushNotificationsAsync } from "@/src/common/notification-services";
import { Observer } from "mobx-react-lite";
import React from "react";
import AuthController from "../../interfaces/controllers/auth.controller";
import SplashView from "./splash.view";

const SplashContainer: React.FC<{
  onNavigateToHome: () => void;
}> = (props) => {
  const timeoutId = React.useRef<number | null>(null);
  const store = React.useContext(StoreContext);
  const controller = new AuthController(store);

  React.useEffect(() => {
    callPushNotifications();
    handleLoginStatus();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  });

  const handleLoginStatus = async (): Promise<void> => {
    await controller.checkLoginStatus();

    // Set a new timeout for navigation
    timeoutId.current = setTimeout(() => {
      props.onNavigateToHome();
    }, 1000);
  };

  const callPushNotifications = async (): Promise<void> => {
    await registerForPushNotificationsAsync();
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
