import { FlatList, StyleSheet, View, ViewToken } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import FlatListItem from '../../components/FlatListItem';

const data = new Array(50).fill(0).map((_, index) => ({ id: index }))

const AnimatedList = () => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    const renderItem = ({ item } : { item: {id: number} }) => <FlatListItem viewableItems={viewableItems} item={item} />

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                contentContainerStyle={{ paddingTop: 10 }}
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                    viewableItems.value = vItems;
                }}
                renderItem={renderItem}
            />
        </View>
    )
}

export default AnimatedList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})