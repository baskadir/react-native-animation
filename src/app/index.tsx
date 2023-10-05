import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import NavButton from '../components/NavButton'

const Index = () => {
    return (
        <View style={styles.container}>
            <NavButton title='Change Size' route='/(sample)/change-size' />
            <NavButton title='Translate' route='/(sample)/translate' />
            <NavButton title='Change Radius' route='/(sample)/change-radius' />
            <NavButton title='Linear Easing' route='/(sample)/linear-easing' />
            <NavButton title='Shake' route='/(sample)/shake' />
            <StatusBar style="auto" />
        </View>
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