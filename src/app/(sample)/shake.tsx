import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import CustomView from '../../components/CustomView';
import { Button } from '../../components/Button';

const Shake = () => {
    const offset = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }]
    }))

    const OFFSET = 40;
    const TIME = 250;
    const DELAY = 400;

    // withRepeat - repeat an animation a given number of times (infinite = -1)
    // withSequence - run animations in squence, 
    // withDelat - start an animation with a delay

    const handleShake = () => {
        offset.value = withDelay(
            DELAY,
            withSequence(
                // start 
                withTiming(-OFFSET, { duration: TIME / 2 }),
                // shake between -OFFSET and OFFSET 5 times
                withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
                // go back to 0 
                withTiming(0, { duration: TIME / 2 })
            )
        )
    }

    return (
        <CustomView>
            <Animated.View style={[styles.box, animatedStyle]} />
            <Button title='Shake' onPress={handleShake} />
        </CustomView>
    )
}

export default Shake

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        margin: 50,
        borderRadius: 15,
        backgroundColor: '#b58df1',
    },
})
