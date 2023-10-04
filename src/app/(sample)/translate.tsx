import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Button } from '../../components/Button';

const Translate = () => {
    const translateX = useSharedValue(0);

    // for customize shared value changes based on some inputs (multiply by 2 etc.)
    // couldn't use inline styling use useAnimatedStyle hook 
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 2) }],
    }));

    const handleMove = (side: string) => {
        translateX.value = side === "r" ? withSpring(translateX.value + 40) : translateX.value = withSpring(translateX.value - 40);
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyles]} />
            <Button title='Move Right' onPress={() => handleMove("r")} />
            <Button title='Move Left' onPress={() => handleMove("l")} />
        </View>
    )
}

export default Translate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'violet',
        borderRadius: 20
    }
})