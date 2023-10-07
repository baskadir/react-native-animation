import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import NavButton from '../components/NavButton'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Index = () => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <NavButton title='Change Size' route='/(sample)/change-size' />
            <NavButton title='Translate' route='/(sample)/translate' />
            <NavButton title='Change Radius' route='/(sample)/change-radius' />
            <NavButton title='Linear Easing' route='/(sample)/linear-easing' />
            <NavButton title='Shake' route='/(sample)/shake' />
            <NavButton title='Circle Tap-Pan Gesture' route='/(sample)/circle-gesture' />
            <NavButton title='Square Pan Gesture' route='/(sample)/square-gesture' />
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})