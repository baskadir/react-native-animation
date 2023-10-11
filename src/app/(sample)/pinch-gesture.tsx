import { StyleSheet, Image, Dimensions } from 'react-native'
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const imageUri = 'https://images.unsplash.com/photo-1696537768579-705244eb77c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get("window");

const PinchGesture = () => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onActive: (event) => {
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
        onEnd: () => {
            scale.value = withTiming(1)
        }
    });

    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -width / 2 },
                { translateY: -height / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: width / 2 },
                { translateY: height / 2 },
            ]
        }
    });

    const animatedFocalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
            ]
        }
    })

    return (
        <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={{ flex: 1 }}>
                <AnimatedImage style={[{ flex: 1 }, animatedImageStyle]} source={{ uri: imageUri }} />
                <Animated.View style={[styles.focalPoint, animatedFocalPointStyle]} />
            </Animated.View>
        </PinchGestureHandler>
    )
}

export default PinchGesture

const styles = StyleSheet.create({
    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10
    }
})