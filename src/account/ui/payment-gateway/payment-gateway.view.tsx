import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

interface IPaymentGatewayViewModel {
  paymentUrl: string;
  onFailed: () => void;
  onSuccess: () => void;
}

const PaymentGatewayView: React.FC<IPaymentGatewayViewModel> = (props) => {
  const [hide, setHide] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      {!hide && (
        <WebView
          style={styles.container}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          source={{ uri: props.paymentUrl }}
          onNavigationStateChange={(event) => {
            if (event.url.includes("success")) {
              props.onSuccess();
            }
            if (event.url.includes("fail")) {
              props.onFailed();
            }
            setHide(
              event.url.includes("success") || event.url.includes("fail")
            );
          }}
        />
      )}
    </View>
  );
};
export default PaymentGatewayView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
