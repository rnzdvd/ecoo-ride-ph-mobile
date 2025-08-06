import { Observer } from "mobx-react-lite";
import React from "react";
import SplashView from "./splash.view";

const SplashContainer: React.FC<{
  onNavigateToHome: () => void;
}> = (props) => {
  React.useEffect(() => {
    const timeoutId = setTimeout(props.onNavigateToHome, 2000);
    return () => clearTimeout(timeoutId);
  });

  return (
    <Observer>
      {() => {
        return <SplashView />;
      }}
    </Observer>
  );
};

export default SplashContainer;
