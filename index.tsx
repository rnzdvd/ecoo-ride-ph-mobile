import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import App from "./src/app/app";

export default function Index() {
  return <App />;
}

registerRootComponent(Index);
