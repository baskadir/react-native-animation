import { Dimensions, Image, ImageBackground, StyleSheet } from 'react-native'
import { useCallback, useRef } from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import CustomView from '../../components/CustomView'

const imageUri = 'https://images.unsplash.com/photo-1564416437164-e2d131e7ec07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
const heartIcon = 'https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png'

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTap = () => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    const doubleTapRef = useRef();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: Math.max(scale.value, 0) }]
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const onSingleTap = useCallback(() => {
        opacity.value = withTiming(1, undefined, (isFinished) => {
            if (isFinished)
                opacity.value = withDelay(500, withTiming(0));
        });
    }, [])

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished)
                scale.value = withDelay(500, withSpring(0));
        });
    }, [])

    return (
        <CustomView>
            <TapGestureHandler
                waitFor={doubleTapRef}
                onActivated={onSingleTap}
            >
                <TapGestureHandler
                    maxDelayMs={250}
                    ref={doubleTapRef}
                    numberOfTaps={2}
                    onActivated={onDoubleTap}
                >
                    <Animated.View>
                        <ImageBackground source={{ uri: imageUri }} style={styles.image}>
                            <AnimatedImage source={{ uri: heartIcon }} style={[styles.image, styles.icon, animatedStyle]} resizeMode='center' />
                        </ImageBackground>
                        <Animated.Text style={[styles.text, animatedTextStyle]}>🔥🔥🔥🔥</Animated.Text>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </CustomView>
    )
}

export default DoubleTap

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE
    },
    icon: {
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowOpacity: 0.3,
        shadowRadius: 35,
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 30
    }
})