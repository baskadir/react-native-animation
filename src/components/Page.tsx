import { Dimensions, StyleSheet, View, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get("window");

const SIZE = width * 0.7;

const Page = ({ index, title, translateX }: PageProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, animatedStyle]} />
      <Animated.View style={[{ position: "absolute" }, animatedTextStyle]}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256, 0.4)",
  },
  text: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "bold",
  },
});

export { Page };
