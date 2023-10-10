import { StyleSheet, Switch, Dimensions } from 'react-native'
import { useState } from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

const COLORS = {
    dark: {
        background: '#1E1E1E',
        circle: '#252525',
        text: '#F8F8F8'
    },
    light: {
        background: '#F8F8F8',
        circle: '#FFF',
        text: '#1E1E1E'
    }
}

const SWITCH_TRACK_COLOR = {
    true: 'rgba(256,0,256,0.2)',
    false: 'rgba(0,0,0,0.1)'
}

type Theme = 'light' | 'dark';

const InterpolateColor = () => {
    const [theme, setTheme] = useState<Theme>('light');

    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0);
    }, [theme]);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value, [0, 1], [
            COLORS.light.background,
            COLORS.dark.background
        ]);

        return { backgroundColor }
    })

    const animatedCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value, [0, 1], [
            COLORS.light.circle,
            COLORS.dark.circle
        ]);

        return { backgroundColor }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(progress.value, [0, 1], [
            COLORS.light.text,
            COLORS.dark.text
        ]);

        return { color }
    })

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Animated.Text style={[styles.text, animatedTextStyle]}>Theme</Animated.Text>
            <Animated.View style={[styles.circle, animatedCircleStyle]}>
                <Switch
                    value={theme === 'dark'}
                    onValueChange={(toggled) => {
                        setTheme(toggled ? 'dark' : 'light')
                    }}
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor={'violet'}
                />
            </Animated.View>
        </Animated.View>
    )
}

export default InterpolateColor

const SIZE = Dimensions.get("window").width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: SIZE,
        height: SIZE,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE / 2,
        shadowOffset: {
            width: 0,
            height: 20
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 8,
    },
    text: {
        fontSize: 70,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 14,
        marginBottom: 35
    }
})