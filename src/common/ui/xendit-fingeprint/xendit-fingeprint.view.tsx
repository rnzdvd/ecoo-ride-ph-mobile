import { Asset } from "expo-asset";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

interface IXenditFingeprintWebviewViewModel {
  onFingerprint: (fingerprint: string) => void;
}

const XenditFingeprintView: React.FC<IXenditFingeprintWebviewViewModel> = (
  props
) => {
  const [htmlUri, setHtmlUri] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      // Load the HTML asset
      const asset = Asset.fromModule(
        require("../../../../assets/html/xendit.html")
      );
      await asset.downloadAsync();
      setHtmlUri(asset.localUri || asset.uri);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {htmlUri ? (
        <WebView
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          source={{ uri: htmlUri }}
          onMessage={(event) => {
            props.onFingerprint(event.nativeEvent.data);
          }}
        />
      ) : null}
    </View>
  );
};

export default XenditFingeprintView;

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: 1,
    opacity: 0,
  },
});
