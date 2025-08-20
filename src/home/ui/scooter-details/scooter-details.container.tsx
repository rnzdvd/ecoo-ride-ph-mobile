import { StoreContext } from "@/src/app/store";
import { Observer } from "mobx-react-lite";
import React from "react";
import ScooterEntity from "../../entities/scooter.entity";
import HomeController from "../../interfaces/controllers/home.controller";
import HomePresenter from "../../interfaces/presenters/home.presenter";
import ScooterDetailsView from "./scooter-details.view";

const ScooterDetailsContainer: React.FC<{
  isVisible: boolean;
  onModalClose: () => void;
  onContinue: () => void;
  scooterEntity: ScooterEntity;
}> = (props) => {
  const store = React.useContext(StoreContext);
  const controller = new HomeController(store);
  const presenter = new HomePresenter(store);

  const handleContinue = (selectedOption: string): void => {
    controller.setSelectedOption(selectedOption);
    props.onModalClose();
    props.onContinue();
  };

  return (
    <Observer>
      {() => {
        return (
          <ScooterDetailsView
            scooterEntity={props.scooterEntity}
            balanceEntity={presenter.getUserBalance()}
            isVisible={props.isVisible}
            onModalClose={props.onModalClose}
            onContinue={handleContinue}
          />
        );
      }}
    </Observer>
  );
};

export default ScooterDetailsContainer;
