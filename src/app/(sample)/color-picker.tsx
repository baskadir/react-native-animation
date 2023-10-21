import { Dimensions, StyleSheet, View } from 'react-native'
import ColorPicker from '../../components/ColorPicker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useCallback } from 'react';

const COLORS = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white'
]

const BG_COLOR = 'rgba(0,0,0,0.9)';

const {width} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

const ColorPickerPage = () => {
    const pickedColor = useSharedValue<string | number>(COLORS[0]);

    const onColorChanged = useCallback((color:  string | number) => {
        'worklet'
        pickedColor.value = color
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pickedColor.value
        }
    });


    return (
        <>
            <View style={styles.top}>
                <Animated.View style={[styles.circle, animatedStyle]} />
            </View>
            <View style={styles.bottom}>
                <ColorPicker
                    colors={COLORS}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                    maxWidth={PICKER_WIDTH}
                    onColorChanged={onColorChanged}
                />
            </View>
        </>
    )
}

export default ColorPickerPage

const styles = StyleSheet.create({
    top: {
        flex: 3,
        backgroundColor: BG_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        flex: 1,
        backgroundColor: BG_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradient: {
        height: 40,
        width: PICKER_WIDTH,
        borderRadius: 20
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: 'red',
        borderRadius: CIRCLE_SIZE / 2
    }
})