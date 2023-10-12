import { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import { Circle, Svg } from 'react-native-svg';

const BG_COLOR = "#444b6f";
const BG_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#a6e1fa';

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000;
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = () => {
    const progress = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value)
    }));

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}`;
    })

    const handlePress = useCallback(() => {
        progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 })
    }, [])

    return (
        <View style={styles.container}>
            <ReText style={styles.progressText} text={progressText} />
            <Svg style={{ position: 'absolute' }}>
                <Circle
                    cx={width / 2}
                    cy={height / 2}
                    r={RADIUS}
                    stroke={BG_STROKE_COLOR}
                    fill={BG_COLOR}
                    strokeWidth={30}
                />
                <AnimatedCircle
                    cx={width / 2}
                    cy={height / 2}
                    r={RADIUS}
                    stroke={STROKE_COLOR}
                    fill={BG_COLOR}
                    strokeWidth={15}
                    strokeDasharray={CIRCLE_LENGTH}
                    animatedProps={animatedProps}
                    strokeLinecap={'round'}
                />
            </Svg>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Run</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CircularProgress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressText: {
        fontSize: 80,
        color: 'rgba(256,256,256,0.7)',
        width: 200,
        textAlign: 'center',
        zIndex: 999
    },
    button: {
        position: 'absolute',
        bottom: 80,
        width: width * 0.7,
        height: 60,
        backgroundColor: BG_STROKE_COLOR,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 2.0
    }
})