import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const Button = ({title, onPress} : {title: string, onPress: () => void}) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        padding: 16,
        backgroundColor: 'dodgerblue',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
})