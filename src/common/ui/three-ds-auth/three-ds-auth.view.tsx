import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

interface IThreeDsAuthViewModel {
  threeDsUrl: string;
  onFailed: () => void;
  onSuccess: () => void;
}

const ThreeDsAuthView: React.FC<IThreeDsAuthViewModel> = (props) => {
  const [hide, setHide] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      {!hide && (
        <WebView
          style={styles.container}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          source={{ uri: props.threeDsUrl }}
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

export default ThreeDsAuthView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
