import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('My Tasks')
        }, 2000)
    }, [])

    return (
        <View style={styles.body}>
            <Image style={styles.logo} source={require('../../assets/1.png')} />
            <Text style={styles.text}>To Do List</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4d79ff'
    },
    logo: {
        width: 200,
        height: 200,
        margin: 20
    },
    text: {
        fontSize: 40,
        fontWeight: '900',
        color: 'white'
    }
})
