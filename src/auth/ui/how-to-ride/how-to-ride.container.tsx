import { Observer } from "mobx-react-lite";
import React from "react";
import HowToRideView from "./how-to-ride.view";

const HowToRideContainer: React.FC<{
  onNavigateToHome: () => void;
}> = (props) => {
  return (
    <Observer>
      {() => {
        return <HowToRideView onNavigateToHome={props.onNavigateToHome} />;
      }}
    </Observer>
  );
};

export default HowToRideContainer;
