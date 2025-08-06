import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface ILoginViewModel {
  optional?: any;
}

const LoginView: React.FC<ILoginViewModel> = (props) => (
  <View style={styles.container}>
    <Text>Login</Text>
  </View>
);

export default LoginView;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
});
