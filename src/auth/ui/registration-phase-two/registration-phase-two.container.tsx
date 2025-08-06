import { Observer } from "mobx-react-lite";
import React from "react";
import RegistrationPhaseTwoView from "./registration-phase-two.view";

const RegistrationPhaseTwoContainer: React.FC<{
  onOtpConfirmed: () => void;
}> = (props) => (
  <Observer>
    {() => {
      return <RegistrationPhaseTwoView onOtpConfirmed={props.onOtpConfirmed} />;
    }}
  </Observer>
);

export default RegistrationPhaseTwoContainer;
