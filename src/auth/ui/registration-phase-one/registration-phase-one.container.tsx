import { Observer } from "mobx-react-lite";
import React from "react";
import RegistrationPhaseOneView from "./registration-phase-one.view";

const RegistrationPhaseOneContainer: React.FC<{
  onNavigateToOtp: () => void;
}> = (props) => (
  <Observer>
    {() => {
      return (
        <RegistrationPhaseOneView onNavigateToOtp={props.onNavigateToOtp} />
      );
    }}
  </Observer>
);

export default RegistrationPhaseOneContainer;
