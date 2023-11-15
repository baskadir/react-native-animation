import { StyleSheet, View } from 'react-native'
import Dropdown from '../../components/dropdown/Dropdown';

const options = [
    { label: 'Charts', iconName: 'barschart' },
    { label: 'Book', iconName: 'book' },
    { label: 'Calendar', iconName: 'calendar' },
    { label: 'Camera', iconName: 'camera' },
];

const header = {
    label: 'Header',
    iconName: 'ellipsis1'
};

const DropdownMenu = () => {
    return (
        <View style={styles.container}>
            <Dropdown header={header} options={options} />
        </View>
    )
}

export default DropdownMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center'
    }
})