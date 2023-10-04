import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Button } from '../../components/Button';
import CustomView from '../../components/CustomView';

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
        <CustomView>
            <Animated.View style={[styles.box, animatedStyles]} />
            <Button title='Move Right' onPress={() => handleMove("r")} />
            <Button title='Move Left' onPress={() => handleMove("l")} />
        </CustomView>
    )
}

export default Translate

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'violet',
        borderRadius: 20
    }
})