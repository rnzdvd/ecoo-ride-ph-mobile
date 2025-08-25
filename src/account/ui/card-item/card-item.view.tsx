import { Colors } from "@/src/common/colors";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import CardEntity from "../../entities/card.entity";

interface ICardItemViewModel {
  card: CardEntity;
  onRemoveCard: (card: CardEntity) => void;
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
            style={{ width: 40, height: 40 }}
          />
        );
      case "mastercard":
        return (
          <Image
            source={require("@/assets/images/master_card.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        );
      case "amex":
        return (
          <Image
            source={require("@/assets/images/amex_logo.jpg")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        );
      case "jcb":
        return (
          <Image
            source={require("@/assets/images/jcb_logo.jpg")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        );
      default:
        return <Icon source="card" size={24} />;
    }
  };

  return (
    <View style={styles.container}>
      {displayCardBrand(card.network)}
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          **** **** {card.last4}
        </Text>

        <Text style={{ marginTop: 5, fontSize: 12 }}>Type: {card.type}</Text>
        <Text
          style={{ marginTop: 5, fontSize: 12, color: Colors.semiDarkGrey }}
        >
          {card.expiryDate}
        </Text>
      </View>

      <Pressable onPress={() => props.onRemoveCard(card)}>
        <Icon source="delete-outline" size={30} color={Colors.red} />
      </Pressable>
    </View>
  );
};

export default CardItemView;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
  },
});
