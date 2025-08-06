import { Observer } from "mobx-react-lite";
import React from "react";
import RideInstructionsView from "./ride-instructions.view";

const RideInstructionsContainer: React.FC<{
  onNavigateToRide: () => void;
}> = (props) => {
  const handleStartRide = async (): Promise<void> => {
    // Logic to start the ride goes here
    props.onNavigateToRide();
  };

  return (
    <Observer>
      {() => {
        return <RideInstructionsView onStartRide={handleStartRide} />;
      }}
    </Observer>
  );
};

export default RideInstructionsContainer;
