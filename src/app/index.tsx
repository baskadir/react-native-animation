import { StyleSheet, FlatList, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import NavButton from '../components/NavButton'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface IRoute {
    id: number;
    title: string;
    routeName: string;
} 

const routes: IRoute[] = [
    { id: 1, title: 'Change Size', routeName: 'change-size' },
    { id: 2, title: 'Translate', routeName: 'translate' },
    { id: 3, title: 'Change Radius', routeName: 'change-radius' },
    { id: 4, title: 'Linear Easing', routeName: 'linear-easing' },
    { id: 5, title: 'Shake', routeName: 'shake' },
    { id: 6, title: 'Circle Tap-Pan Gesture', routeName: 'circle-gesture' },
    { id: 7, title: 'Square Pan Gesture', routeName: 'square-gesture' },
    { id: 8, title: 'Pan Gesture', routeName: 'inside-outside' },
    { id: 9, title: 'Interpolate ScrollView', routeName: 'interpolate-scrollview' },
    { id: 10, title: 'Interpolate Color', routeName: 'interpolate-color' },
    { id: 11, title: 'Single / Double Tap', routeName: 'double-tap' },
    { id: 12, title: 'Pinch Gesture', routeName: 'pinch-gesture' },
    { id: 13, title: 'Circular Progress', routeName: 'circular-progress' },
    { id: 14, title: 'Color Picker', routeName: 'color-picker' },
    { id: 15, title: 'Swipe to Delete', routeName: 'swipe-delete' },
    { id: 16, title: 'Ripple Effect', routeName: 'ripple-effect' },
]

const Index = () => {
    const renderItem = ({ item } : { item: IRoute}) => {
        return (
            <View style={styles.itemContainer}>
                <NavButton title={item.title} route={`/(sample)/${item.routeName}`} />
            </View>
        )
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <FlatList
                data={routes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 75,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})