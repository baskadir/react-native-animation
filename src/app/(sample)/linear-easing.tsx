import { StyleSheet, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    withRepeat,
} from 'react-native-reanimated';
import CustomView from '../../components/CustomView';
import { Button } from '../../components/Button';

const duration = 2000;

const LinearEasing = () => {
    const defaultAnimation = useSharedValue(200);
    const linear = useSharedValue(200);
    const steps = useSharedValue(200);

    const animatedDefault = useAnimatedStyle(() => ({
        transform: [{ translateX: defaultAnimation.value }]
    }))

    const animatedLinear = useAnimatedStyle(() => ({
        transform: [{ translateX: linear.value }]
    }))

    const animatedSteps = useAnimatedStyle(() => ({
        transform: [{ translateX: steps.value }]
    }))

    const handleStart = () => {
        linear.value = withRepeat(
            withTiming(-linear.value, {
                duration,
                easing: Easing.linear
            }),
            -1,
            true
        );
        defaultAnimation.value = withRepeat(
            withTiming(-defaultAnimation.value, {
                duration,
            }),
            -1,
            true
        );
        steps.value = withRepeat(
            withTiming(-steps.value, {
                duration,
                easing: Easing.steps(5, true)
            }),
            -1,
            true
        );

    }

    const handleReset = () => {
        linear.value = 200;
        defaultAnimation.value = 200;
        steps.value = 200;
    }

    return (
        <CustomView>
            <Animated.View style={[styles.box, animatedDefault]}>
                <Text style={styles.text}>In-out</Text>
            </Animated.View>
            <Animated.View style={[styles.box, animatedLinear]}>
                <Text style={styles.text}>Linear</Text>
            </Animated.View>
            <Animated.View style={[styles.box, animatedSteps]}>
                <Text style={styles.text}>Steps</Text>
            </Animated.View>
            <Button title='Start' onPress={handleStart} />
            <Button title='Reset' onPress={handleReset} />
        </CustomView>
    )
}

export default LinearEasing

const styles = StyleSheet.create({
    box: {
        height: 80,
        width: 80,
        margin: 20,
        borderWidth: 1,
        borderColor: '#b58df1',
        backgroundColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})