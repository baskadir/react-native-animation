import { StyleSheet, View } from 'react-native'
import Animated, { withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { Button } from '../../components/Button';

const ChangeSize = () => {
    const width = useSharedValue(50);
    const height = useSharedValue(50);

    const handleChangeSize = (operator: string, isWidth: boolean = false) => {
        if(isWidth)
            width.value = operator === "+" ? withSpring(width.value + 40) : withSpring(width.value - 40);
        else
            height.value = operator === "+" ? withSpring(height.value + 40) : withSpring(height.value - 40);
    }

    return (
        <View style={styles.container}>
            <Animated.View style={{...styles.box, width, height}} />
            <View>
                <Button title="Expand Width" onPress={() => handleChangeSize("+", true)} />
                <Button title='Shorten Width' onPress={() => handleChangeSize("-", true)} />
                <Button title="Expand Height" onPress={() => handleChangeSize("+")} />
                <Button title="Shorten Height" onPress={() => handleChangeSize("-")} />
            </View>
        </View>
    )
}

export default ChangeSize;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    box: {
        backgroundColor: 'violet',
        borderRadius: 20,
        marginVertical: 64
    }
})