import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const NavButton = ({title, route}: {title: string, route: string} ) => {
  return (
    <TouchableOpacity onPress={() => router.push(route)} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default NavButton

const styles = StyleSheet.create({
    button: {
        padding: 16,
        backgroundColor: 'darkorange',
        borderRadius: 8,
        marginTop: 10,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
})