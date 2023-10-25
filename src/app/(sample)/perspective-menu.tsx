import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const THRESHOLD = SCREEN_WIDTH / 3;
const BG_COLOR = "#1e1e23";

const PerspectiveMenu = () => {
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) translateX.value = withTiming(0);
      else translateX.value = withTiming(SCREEN_WIDTH / 2);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `-${rotate}deg` },
      ],
    };
  });

  const onPress = useCallback(() => {
    if (translateX.value > 0) translateX.value = withTiming(0);
    else translateX.value = withTiming(SCREEN_WIDTH / 2);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[{ backgroundColor: "#fff", flex: 1 }, animatedStyle]}
        >
          <Feather
            name="menu"
            size={32}
            color={BG_COLOR}
            style={{ margin: 15 }}
            onPress={onPress}
          />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default PerspectiveMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
