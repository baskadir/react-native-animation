import { StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated'

const SIZE = 100;

const SquareGesture = () => {
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const height = useSharedValue(0);
    const width = useSharedValue(0);

    const onLayout = (event: any) => {
        height.value = event.nativeEvent.layout.height;
        width.value = event.nativeEvent.layout.width;
    }

    // withDecay : lets you create decelerating animations based on velocity coming from gesture
    const pan = Gesture.Pan()
        .onChange((event) => {
            offsetX.value = event.changeX;
            offsetY.value = event.changeY;
        })
        .onFinalize((event) => {
            offsetX.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [-(height.value / 2) + SIZE / 2, height.value / 2 - SIZE / 2]
            });
            offsetY.value = withDecay({
                velocity: event.velocityY,
                rubberBandEffect: true,
                clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2]
            })
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value }
        ],
    }));


    return (
        <View onLayout={onLayout} style={styles.wrapper}>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.box, animatedStyle]} />
            </GestureDetector>
            <Text style={styles.text}>Grab and release the square</Text>
        </View>
    )
}

export default SquareGesture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: SIZE,
        width: SIZE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        cursor: 'grab',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginVertical: 20,
    }
})