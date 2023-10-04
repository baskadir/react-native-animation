import { StyleSheet, View } from 'react-native'
import Animated, { withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { Button } from '../../components/Button';
import CustomView from '../../components/CustomView';

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
        <CustomView>
            <Animated.View style={{...styles.box, width, height}} />
            <View>
                <Button title="Expand Width" onPress={() => handleChangeSize("+", true)} />
                <Button title='Shorten Width' onPress={() => handleChangeSize("-", true)} />
                <Button title="Expand Height" onPress={() => handleChangeSize("+")} />
                <Button title="Shorten Height" onPress={() => handleChangeSize("-")} />
            </View>
        </CustomView>
    )
}

export default ChangeSize;

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'violet',
        borderRadius: 20,
        marginVertical: 64
    }
})