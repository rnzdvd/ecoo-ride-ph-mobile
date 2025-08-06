import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { JSX } from "react";
import { ColorValue, StatusBarStyle } from "react-native";
import Container from "./container.view";

export interface IScreenContainer {
  navigation: NativeStackNavigationProp<ParamListBase, string>;
  route: RouteProp<ParamListBase>;
}

export interface IAppScreen {
  hideHeader?: boolean;
  hideBack?: boolean;
  children: JSX.Element;
  title?: string;
  onBack?: () => void;
  showSecondaryBack?: boolean;
  showDomain?: boolean;
  navigation: NavigationProp<ParamListBase, string>;
  barStyle: StatusBarStyle;
  statusBarBg: ColorValue;
}

const AppScreen: React.FC<IAppScreen> = (props) => {
  return (
    <Container barStyle={props.barStyle} statusBarBg={props.statusBarBg}>
      {props.children}
    </Container>
  );
};

export default AppScreen;
