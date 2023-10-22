import { StyleSheet, Text } from 'react-native'
import CustomView from '../../components/CustomView'
import Ripple from '../../components/Ripple'

const RippleEffect = () => {
  return (
    <CustomView>
        <Ripple style={styles.ripple}>
            <Text style={{fontSize: 25}}>Tap</Text>
        </Ripple>
    </CustomView>
  )
}

export default RippleEffect

const styles = StyleSheet.create({
    ripple: {
        width: 200,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 20,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})