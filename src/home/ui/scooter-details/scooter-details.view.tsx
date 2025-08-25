import BalanceEntity from "@/src/account/entities/balance.entity";
import { Colors } from "@/src/common/colors";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";
import { Button, Icon, Text } from "react-native-paper";
import ScooterEntity from "../../entities/scooter.entity";

interface IScooterDetailsViewModel {
  isVisible: boolean;
  balanceEntity: BalanceEntity;
  scooterEntity: ScooterEntity;
  onModalClose: () => void;
  onContinue: (selectedOption: string) => void;
}

const ScooterDetailsView: React.FC<IScooterDetailsViewModel> = (props) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const selectedStyle = (option: string): StyleProp<ViewStyle> => {
    if (selectedOption === option) {
      return {
        borderColor: Colors.primaryColor,
        borderWidth: 2,
      };
    }

    return {};
  };

  const handleSelectOption = (option: string): void => {
    if (option === "10min") {
      if (props.balanceEntity.balance >= 35) {
        setSelectedOption(option);
      }
    } else {
      if (props.balanceEntity.balance >= 65) {
        setSelectedOption(option);
      }
    }
  };

  return (
    <Modal
      style={styles.modalContainer}
      propagateSwipe
      isVisible={props.isVisible}
      onBackdropPress={props.onModalClose}
      onBackButtonPress={props.onModalClose}
      onSwipeComplete={props.onModalClose}
      swipeThreshold={100}
      swipeDirection="down"
    >
      <View style={styles.container}>
        <View style={styles.bikeInfoContainer}>
          <View>
            <Icon source={"scooter"} size={45} color={Colors.primaryColor} />
          </View>

          <View style={styles.bikeInfoSubContainer}>
            <Text style={styles.bikeNameLabel}>{props.scooterEntity.name}</Text>
            <View style={styles.bikeBatteryContainer}>
              <Icon source={"battery-high"} size={15} />
              <Text style={styles.bikeBatteryLabel}>
                {props.scooterEntity.battery}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bikeRentPriceParentContainer}>
          <Text style={styles.pricingDetailsLabel}>Pricing Details</Text>

          <Pressable onPress={() => handleSelectOption("10min")}>
            <View style={[styles.rentOptionContainer, selectedStyle("10min")]}>
              <Text
                style={[
                  styles.bikeRentalPriceLabelTwo,
                  props.balanceEntity.balance < 35 && {
                    color: Colors.semiDarkGrey,
                  },
                ]}
              >
                Rent it for 35 PHP for 10 mins
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => handleSelectOption("20min")}>
            <View style={[styles.rentOptionContainer, selectedStyle("20min")]}>
              <Text
                style={[
                  styles.bikeRentalPriceLabelTwo,
                  props.balanceEntity.balance < 65 && {
                    color: Colors.semiDarkGrey,
                  },
                ]}
              >
                Rent it for 65 PHP for 20 mins
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.ridingRulesContainer}>
          <Text style={styles.ridingRulesLabelOne}>
            Vehicles must be parked in designated parking areas.
          </Text>

          <Text style={styles.ridingRulesLabelTwo}>
            This will help in keeping our streets safe
          </Text>
        </View>

        <View style={styles.walletContainer}>
          <Icon source="wallet" size={35} color={Colors.primaryColor} />
          <View style={styles.balanceContainer}>
            <Text style={styles.walletLabel}>
              {props.balanceEntity.balance} PHP
            </Text>
            <Text style={styles.currentBalanceLabel}>Current Balance</Text>
          </View>
        </View>

        <Button
          disabled={!selectedOption}
          mode="contained"
          style={styles.continueButton}
          onPress={() => props.onContinue(selectedOption)}
        >
          CONTINUE
        </Button>
      </View>
    </Modal>
  );
};

export default ScooterDetailsView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  bikeInfoContainer: {
    flexDirection: "row",
  },
  bikeRentPriceContainer: {
    marginTop: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  bikeInfoSubContainer: {
    marginLeft: 10,
  },
  bikeNameLabel: {
    fontSize: 14,
  },
  bikeBatteryLabel: {
    fontSize: 12,
  },
  bikeRentalPriceLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  bikeBatteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  pricingDetailsLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ridingRulesContainer: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  bikeRentalPriceLabelTwo: {
    fontSize: 12,
  },
  ridingRulesLabelOne: {
    fontSize: 12,
    fontWeight: "bold",
  },
  ridingRulesLabelTwo: {
    fontSize: 12,
    marginTop: 10,
  },
  walletContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  walletLabel: {
    fontWeight: "bold",
  },
  continueButton: {
    borderRadius: 10,
    marginVertical: 10,
  },
  rentOptionContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  bikeRentPriceParentContainer: {
    marginTop: 20,
  },
  balanceContainer: {
    marginLeft: 10,
  },
  currentBalanceLabel: {
    fontSize: 10,
    color: Colors.semiDarkGrey,
  },
});
