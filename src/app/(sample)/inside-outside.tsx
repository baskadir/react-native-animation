import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import CustomView from '../../components/CustomView';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const SIZE = 90.0;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
    translateX: number;
    translateY: number;
}

const InsideOutside = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
            if(distance < CIRCLE_RADIUS + SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);                
            }
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    })

    return (
        <CustomView>
            <Text style={styles.text}>Drag the square</Text>
            <View style={styles.circle}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View style={[styles.box, animatedStyle]} />
                </PanGestureHandler>
            </View>
        </CustomView>
    )
}

export default InsideOutside

const styles = StyleSheet.create({
    box: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(0, 0, 256, 0.5)',
        borderRadius: 20
    },
    text: {
        position: 'absolute',
        top: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 5,
        borderStyle: 'dashed',
        borderColor: 'rgba(0, 0, 256, 0.5)'
    }
})