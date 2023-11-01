import Animated, { useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';

const SQUARE_COUNT = 12;
const SQUARE_SIZE = 12;

interface SquareProps {
    index: number;
    progress: Animated.SharedValue<number>;
}

const Square = ({ index, progress }: SquareProps) => {
    const offsetAngle = (2 * Math.PI) / SQUARE_COUNT;
    const finalAngle = offsetAngle * (SQUARE_COUNT - 1 - index);

    const rotate = useDerivedValue(() => {
        if (progress.value <= 2 * Math.PI) {
            return Math.min(finalAngle, progress.value);
        }
        if (progress.value - 2 * Math.PI < finalAngle) {
            return finalAngle;
        }
        return progress.value;
    }, [])

    const translateY = useDerivedValue(() => {
        if (rotate.value === finalAngle) {
            return withSpring(-SQUARE_COUNT * SQUARE_SIZE)
        }

        if (progress.value > 2 * Math.PI) {
            return withTiming((index - SQUARE_COUNT) * SQUARE_SIZE);
        }
        return withTiming(-index * SQUARE_SIZE);
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotate.value}rad` },
                { translateY: translateY.value }
            ]
        }
    })

    return (
        <Animated.View
            key={index}
            style={[
                {
                    height: SQUARE_SIZE,
                    aspectRatio: 1,
                    backgroundColor: '#000',
                    position: 'absolute',
                }, animatedStyle]}
        />
    )
}

export default Square;