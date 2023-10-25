import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useCallback, useState } from "react";

const ICON_SIZE = 32;

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const BUTTON_WIDTH = 200;

const Counter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

  const [count, setCount] = useState(0);

  // wrapper function
  const incrementCount = useCallback(() => {
    // external library function
    setCount((currentCount) => currentCount + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((currentCount) => currentCount - 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event, context) => {
        translateX.value = clamp(
          event.translationX,
          -MAX_SLIDE_OFFSET,
          MAX_SLIDE_OFFSET
        );

        translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
      },
      onEnd: () => {
        if (translateY.value === MAX_SLIDE_OFFSET) {
          runOnJS(resetCount)();
        } else if (translateX.value === MAX_SLIDE_OFFSET) {
          runOnJS(incrementCount)();
        } else if (translateX.value === -MAX_SLIDE_OFFSET) {
          runOnJS(decrementCount)();
        }
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const animatedPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4]
    );

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0]
    );
    return {
      opacity: opacityX * opacityY,
    };
  });

  const animatedCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8]
    );
    return {
      opacity,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value * 0.1 },
        { translateY: translateY.value * 0.1 },
      ],
    };
  });

  return (
    <Animated.View style={[styles.button, animatedButtonStyle]}>
      <Animated.View style={animatedPlusMinusIconStyle}>
        <AntDesign name="minus" size={ICON_SIZE} color="#fff" />
      </Animated.View>
      <Animated.View style={animatedCloseIconStyle}>
        <AntDesign name="close" size={ICON_SIZE} color="#fff" />
      </Animated.View>
      <Animated.View style={animatedPlusMinusIconStyle}>
        <AntDesign name="plus" size={ICON_SIZE} color="#fff" />
      </Animated.View>
      <View style={styles.circleContainer}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.circle, animatedStyle]}>
            <Text style={styles.text}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: BUTTON_WIDTH,
    backgroundColor: "#111111",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  circle: {
    height: 60,
    width: 60,
    backgroundColor: "#232323",
    borderRadius: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    color: "#fff",
  },
});
