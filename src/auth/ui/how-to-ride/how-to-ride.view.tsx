import { Colors } from "@/src/common/colors";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
const { width } = Dimensions.get("window");

interface IHowToRideViewModel {
  onNavigateToHome: () => void;
}

interface ICarouselItem {
  content: JSX.Element;
}

const HowToRideView: React.FC<IHowToRideViewModel> = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = React.useRef<ICarouselInstance>(null);

  const steps: ICarouselItem[] = [
    {
      content: (
        <View style={styles.carouselItemContainer}>
          <Image
            source={require("../../../../assets/images/img_eleven.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>Find your ride</Text>
          <Image
            source={require("../../../../assets/images/img_ten.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            Scan QR code to unlock the device
          </Text>
          <Image
            source={require("../../../../assets/images/img_nine.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>Dont forget to use your helmet</Text>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.carouselItemContainer}>
          <Image
            source={require("../../../../assets/images/img_three.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>Kick start your ride</Text>
          <Image
            source={require("../../../../assets/images/img_two.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            To slow down, release the throtte button
          </Text>
          <Image
            source={require("../../../../assets/images/img_one.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            And smoothly pull the brake lever on your left
          </Text>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.carouselItemContainer}>
          <Image
            source={require("../../../../assets/images/img_eight.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            Be mindful of pedestrians and give way
          </Text>
          <Image
            source={require("../../../../assets/images/img_svn.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>Stay on the PMD Lanes</Text>
          <Image
            source={require("../../../../assets/images/img_six.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            Objey traffic rules, follow traffic lights and use hand signals when
            turning
          </Text>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.carouselItemContainer}>
          <Image
            source={require("../../../../assets/images/img_five.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            Push lever down to lock the bikes
          </Text>
          <Image
            source={require("../../../../assets/images/img_four.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.description}>
            Park in any of Scooter Ride hubs and end ride on the app
          </Text>
        </View>
      ),
    },
  ];

  const handleNext = (): void => {
    if (currentIndex !== 3) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
    } else {
      props.onNavigateToHome();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>How to Ride</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          onSnapToItem={setCurrentIndex}
          width={width}
          height={500}
          data={steps}
          renderItem={({ item }) => (
            <View style={styles.carouselContent}>{item.content}</View>
          )}
          autoPlay={false}
          loop={false}
          pagingEnabled
        />
      </View>

      <Button
        onPress={handleNext}
        mode="contained"
        style={styles.continueButton}
      >
        CONTINUE
      </Button>
    </View>
  );
};

export default HowToRideView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 50,
  },
  description: {
    fontSize: 18,
    color: Colors.primaryColor,
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  carouselItemContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.primaryColor,
    textAlign: "center",
  },
  carouselContainer: {
    flex: 1,
  },
  carouselContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    borderRadius: 10,
    padding: 5,
    margin: 20,
  },
});
