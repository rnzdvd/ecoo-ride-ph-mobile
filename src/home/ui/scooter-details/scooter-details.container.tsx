import { Observer } from "mobx-react-lite";
import React from "react";
import ScooterDetailsView from "./scooter-details.view";

const ScooterDetailsContainer: React.FC<{
  isVisible: boolean;
  onModalClose: () => void;
  onContinue: () => void;
}> = (props) => {
  return (
    <Observer>
      {() => {
        return (
          <ScooterDetailsView
            isVisible={props.isVisible}
            onModalClose={props.onModalClose}
            onContinue={() => {
              props.onModalClose();
              props.onContinue();
            }}
          />
        );
      }}
    </Observer>
  );
};

export default ScooterDetailsContainer;
