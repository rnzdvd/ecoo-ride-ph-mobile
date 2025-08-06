import { ColorValue, StatusBar, StatusBarStyle, View } from "react-native";

const CustomStatusBarView: React.FC<{
  backgroundColor: ColorValue;
  barStyle: StatusBarStyle;
}> = ({ backgroundColor, barStyle }) => {
  return (
    <View style={{ backgroundColor }}>
      <StatusBar
        translucent
        barStyle={barStyle}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export default CustomStatusBarView;
