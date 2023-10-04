import { StyleSheet } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { Button } from "../../components/Button";
import CustomView from "../../components/CustomView";

// using createAnimatedComponent, make your own animatable components
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChangeRadius = () => {
  const radius = useSharedValue(20);

  const handleChangeRadius = (operator: string) => {
   operator === '+' ? radius.value += 10 : radius.value -=10;
  }

  const animatedProps: any = useAnimatedProps(() => ({
    r: withSpring(radius.value)
  }));

  return (
    <CustomView>
      <Svg style={styles.svg}>
        <AnimatedCircle cx="50%" cy="50%" fill="red" animatedProps={animatedProps} />
      </Svg>
      <Button title="Increase Radius" onPress={() => handleChangeRadius('+')} />
      <Button title="Decrease Radius" onPress={() => handleChangeRadius('-')} />
    </CustomView>
  );
};

export default ChangeRadius;

const styles = StyleSheet.create({
  svg: {
    height: 300,
    width: '100%'
  }
});
