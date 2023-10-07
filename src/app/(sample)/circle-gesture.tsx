import { StyleSheet, Text } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import CustomView from '../../components/CustomView';

const CircleGesture = () => {
    const pressed = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    
    // for tap : Gesture.Tap() - for pan : Gesture.Pan()
    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            offsetX.value = event.translationX;
            offsetY.value = event.translationY;
        })
        .onFinalize(() => {
            offsetX.value = withSpring(0);
            offsetY.value = withSpring(0);
            pressed.value = false;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
            { scale: withTiming(pressed.value ? 1.2 : 1) },
        ],
        backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1'
    }))


    return (
        <CustomView>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.circle, animatedStyle]} />
            </GestureDetector>
            <Text style={styles.text}>Grab and drag the circle</Text>
        </CustomView>
    )
}

export default CircleGesture;

const styles = StyleSheet.create({
    circle: {
        height: 120,
        width: 120,
        borderRadius: 500
    },
    text: {
        marginVertical: 20,
    }
})