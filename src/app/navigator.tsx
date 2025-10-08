import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Observer } from "mobx-react-lite";
import React from "react";
import AddCardScreen from "../account/screens/add-card.screen";
import BalanceScreen from "../account/screens/balance.screen";
import PaymentGatewayScreen from "../account/screens/payment-gateway.screen";
import PaymentOptionsScreen from "../account/screens/payment-options.screen";
import TopUpScreen from "../account/screens/top-up.screen";
import ConfirmOtpScreen from "../auth/screens/confirm-otp.screen";
import HowToRideScreen from "../auth/screens/how-to-ride.screen";
import PersonalInformationScreen from "../auth/screens/personal-information.screen";
import RegistrationScreen from "../auth/screens/registration.screen";
import SplashScreen from "../auth/screens/splash.screen";
import ViewProfileScreen from "../auth/screens/view-profile.screen";
import SessionContainer from "../auth/ui/session/session.container";
import ThreeDsAuthScreen from "../common/screens/three-ds-auth.screen";
import PushNotificationContainer from "../common/ui/push-notification/push-notification.container";
import HomeScreen from "../home/screens/home.screen";
import ScanScreen from "../home/screens/scan.screen";
import DrawerContainer from "../home/ui/drawer/drawer.container";
import RideHistoryScreen from "../ride/screens/ride-history.screen";
import RideInstructionsScreen from "../ride/screens/ride-instructions.screen";
import RideScreen from "../ride/screens/ride.screen";
import { ScreenNames } from "./screen-registry";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const linking = {
  prefixes: ["ecooridephapp://", "https://ecoo.ride-ph.com"],
  config: {
    screens: {
      Success: "success",
      Fail: "fail",
      Cancel: "cancel",
    },
  },
};

const Navigator: React.FC = () => {
  const navigationRef =
    React.useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(
      null
    );

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Observer>
        {() => {
          return (
            <SessionContainer>
              <PushNotificationContainer>
                <BaseStack />
              </PushNotificationContainer>
            </SessionContainer>
          );
        }}
      </Observer>
    </NavigationContainer>
  );
};

const BaseStack: React.FC = () => (
  <Stack.Navigator
    id={undefined}
    initialRouteName={ScreenNames.SplashScreen}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={ScreenNames.SplashScreen} component={SplashScreen} />
    <Stack.Screen name={ScreenNames.Drawer} component={DrawerStack} />
  </Stack.Navigator>
);

const DrawerStack: React.FC = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <DrawerContainer {...props} />}
  >
    <Drawer.Screen name={ScreenNames.HomeStack} component={HomeStack} />
  </Drawer.Navigator>
);

const HomeStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName={ScreenNames.HomeScreen}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
    <Stack.Screen name={ScreenNames.ScanScreen} component={ScanScreen} />
    <Stack.Screen
      name={ScreenNames.RideInstructionsScreen}
      component={RideInstructionsScreen}
    />
    <Stack.Screen name={ScreenNames.RideScreen} component={RideScreen} />
    <Stack.Screen
      name={ScreenNames.Registration}
      component={RegistrationScreen}
    />
    <Stack.Screen name={ScreenNames.ConfirmOtp} component={ConfirmOtpScreen} />
    <Stack.Screen
      name={ScreenNames.PersonalInformation}
      component={PersonalInformationScreen}
    />
    <Stack.Screen name={ScreenNames.BalanceScreen} component={BalanceScreen} />
    <Stack.Screen name={ScreenNames.TopUpScreen} component={TopUpScreen} />
    <Stack.Screen
      name={ScreenNames.HowToRideScreen}
      component={HowToRideScreen}
    />
    <Stack.Screen
      name={ScreenNames.PaymentOptionsScreen}
      component={PaymentOptionsScreen}
    />
    <Stack.Screen
      name={ScreenNames.RideHistoryScreen}
      component={RideHistoryScreen}
    />
    <Stack.Screen name={ScreenNames.AddCardScreen} component={AddCardScreen} />
    <Stack.Screen
      name={ScreenNames.ThreeDsAuthWebviewScreen}
      component={ThreeDsAuthScreen}
    />
    <Stack.Screen
      name={ScreenNames.PaymentGatewayScreen}
      component={PaymentGatewayScreen}
    />

    <Stack.Screen
      name={ScreenNames.ViewProfileScreen}
      component={ViewProfileScreen}
    />
  </Stack.Navigator>
);
export default Navigator;
