import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import Feather from 'react-native-vector-icons/Feather';


const SignUpPreferencesScreen = ({ navigation, route }) => {
    const userInfo = route.params
    //console.log(userInfo)
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpJoin')}>
                <Feather name='arrow-left' size={25} color='grey' />
            </TouchableOpacity>
        </View>
    )
}

export default SignUpPreferencesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "white",
        alignItems: 'center',
      },
})