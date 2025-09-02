import { Colors } from "@/src/common/colors";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import CardEntity from "../../entities/card.entity";

interface ICardItemViewModel {
  card: CardEntity;
  onRemoveCard?: (card: CardEntity) => void;
  onSelectCard?: (card: CardEntity) => void;
}

const CardItemView: React.FC<ICardItemViewModel> = (props) => {
  const { card } = props;

  const displayCardBrand = (network: string): React.ReactNode => {
    switch (network) {
      case "visa":
        return (
          <Image
            source={require("@/assets/images/visa_logo.png")}
            resizeMode="contain"
            style={styles.cardImage}
          />
        );
      case "mastercard":
        return (
          <Image
            source={require("@/assets/images/master_card.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        );
      case "amex":
        return (
          <Image
            source={require("@/assets/images/amex_logo.jpg")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        );
      case "jcb":
        return (
          <Image
            source={require("@/assets/images/jcb_logo.jpg")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        );
      default:
        return <Icon source="card" size={24} />;
    }
  };

  return (
    <Pressable onPress={() => props.onSelectCard?.(card)}>
      <View style={styles.container}>
        {displayCardBrand(card.network)}
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardNumberText}>**** **** {card.last4}</Text>

          <Text style={styles.cardTypeText}>Type: {card.type}</Text>
          <Text style={styles.expiryDateText}>{card.expiryDate}</Text>
        </View>

        {props.onRemoveCard && (
          <Pressable onPress={() => props.onRemoveCard?.(card)}>
            <Icon source="delete-outline" size={30} color={Colors.red} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default CardItemView;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 40,
    height: 40,
  },
  cardDetailsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  cardNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardTypeText: {
    marginTop: 5,
    fontSize: 12,
  },
  expiryDateText: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.semiDarkGrey,
  },
});
