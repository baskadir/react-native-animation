import { StyleSheet, ViewToken } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface ListItemProps {
    viewableItems: Animated.SharedValue<ViewToken[]>;
    item: {
        id: number;
    };
};

const FlatListItem = ({ viewableItems, item }: ListItemProps) => {

    const animatedStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
            viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItem) => viewableItem.item.id === item.id)
        )

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                { scale: withTiming(isVisible ? 1 : 0.6) }
            ]
        }
    }, [])
    return (
        <Animated.View style={[styles.item, animatedStyle]} />
    )
}

export default FlatListItem

const styles = StyleSheet.create({
    item: {
        height: 80,
        width: '90%',
        backgroundColor: '#78cad2',
        marginTop: 20,
        borderRadius: 15,
        alignSelf: 'center'
    }
})