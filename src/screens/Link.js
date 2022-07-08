import { StyleSheet, View, Linking, Alert, Button, TouchableOpacity, Text } from 'react-native'
import React, { useCallback } from 'react'

const linkFacebook = 'https://www.facebook.com/profile.php?id=100010019441963'
const linkGithub = 'https://github.com/dinhquangdong/CS526_ToDoList'

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url)

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url)
        } else {
            Alert.alert(`Không thể mở đường dẫn sau: ${url}`)
        }
    }, [url])

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}

const Link = () => {
    return (
        <View style={styles.container}>
            <OpenURLButton url={linkFacebook}>Link Facebook</OpenURLButton>
            <OpenURLButton url={linkGithub}>Link Github</OpenURLButton>
        </View>
    )
}

export default Link

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'yellowgreen',
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    }
})
