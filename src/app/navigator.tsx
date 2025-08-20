import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Observer } from "mobx-react-lite";
import React from "react";
import BalanceScreen from "../account/screens/balance.screen";
import PaymentOptionsScreen from "../account/screens/payment-options.screen";
import TopUpScreen from "../account/screens/top-up.screen";
import HowToRideScreen from "../auth/screens/how-to-ride.screen";
import LoginScreen from "../auth/screens/login.screen";
import RegistrationPhaseOneScreen from "../auth/screens/registration-phase-one.screen";
import RegistrationPhaseThreeScreen from "../auth/screens/registration-phase-three.screen";
import RegistrationPhaseTwoScreen from "../auth/screens/registration-phase-two.screen";
import SplashScreen from "../auth/screens/splash.screen";
import PushNotificationContainer from "../common/ui/push-notification/push-notification.container";
import HomeScreen from "../home/screens/home.screen";
import ScanScreen from "../home/screens/scan.screen";
import DrawerContainer from "../home/ui/drawer/drawer.container";
import RideInstructionsScreen from "../ride/screens/ride-instructions.screen";
import RideScreen from "../ride/screens/ride.screen";
import { ScreenNames } from "./screen-registry";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator: React.FC = () => {
  const navigationRef =
    React.useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(
      null
    );

  return (
    <NavigationContainer ref={navigationRef}>
      <Observer>
        {() => {
          return (
            <PushNotificationContainer>
              <BaseStack />
            </PushNotificationContainer>
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
    <Stack.Screen name={ScreenNames.LoginScreen} component={LoginScreen} />
    <Stack.Screen name={ScreenNames.SplashScreen} component={SplashScreen} />
    <Stack.Screen name={ScreenNames.Drawer} component={DrawerStack} />
    <Stack.Screen name={ScreenNames.ScanScreen} component={ScanScreen} />
    <Stack.Screen
      name={ScreenNames.RideInstructionsScreen}
      component={RideInstructionsScreen}
    />
    <Stack.Screen name={ScreenNames.RideScreen} component={RideScreen} />
    <Stack.Screen
      name={ScreenNames.RegistrationPhaseOne}
      component={RegistrationPhaseOneScreen}
    />
    <Stack.Screen
      name={ScreenNames.RegistrationPhaseTwo}
      component={RegistrationPhaseTwoScreen}
    />
    <Stack.Screen
      name={ScreenNames.RegistrationPhaseThree}
      component={RegistrationPhaseThreeScreen}
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
  </Stack.Navigator>
);

const DrawerStack: React.FC = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <DrawerContainer {...props} />}
  >
    <Drawer.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
  </Drawer.Navigator>
);
export default Navigator;
