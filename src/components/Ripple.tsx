import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native'
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { measure, runOnJS, useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface RippleProps {
    style?: StyleProp<ViewStyle>;
    onTap?: () => void;
    children: React.ReactNode
}

const Ripple: React.FC<RippleProps> = ({ style, onTap, children }) => {
    const centerX = useSharedValue(0);
    const centerY = useSharedValue(0);
    const scale = useSharedValue(0);

    const animatedRef = useAnimatedRef<View>();
    const width = useSharedValue(0);
    const height = useSharedValue(0);

    const rippleOpacity = useSharedValue(1);

    const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onStart: (event) => {
            const layout = measure(animatedRef);
            width.value = layout.width;
            height.value = layout.height;

            centerX.value = event.x;
            centerY.value = event.y;

            rippleOpacity.value = 1;
            scale.value = 0;
            scale.value = withTiming(1, { duration: 1000 })
        },
        onActive: () => {
            if (onTap) runOnJS(onTap)();
        },
        onFinish: () => {
            rippleOpacity.value = withTiming(0);
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

        const translateX = centerX.value - circleRadius;
        const translateY = centerY.value - circleRadius;

        return {
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: rippleOpacity.value,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: [
                { scale: scale.value },
                { translateX },
                { translateY }
            ]
        }
    })
    return (
        <View ref={animatedRef} collapsable={false} style={style}>
            <TapGestureHandler onGestureEvent={tapGestureEvent}>
                <Animated.View style={[style, {overflow: 'hidden'}]}>
                    <View>{children}</View>
                    <Animated.View style={animatedStyle} />
                </Animated.View>
            </TapGestureHandler>
        </View>
    )
}

export default Ripple
