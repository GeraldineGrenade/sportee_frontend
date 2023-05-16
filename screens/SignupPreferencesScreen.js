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
            <Text style={styles.title}>Choisis tes préférences</Text>
        </View>
    )
}

export default SignUpPreferencesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30,
        width: '100%',
        height: '100%',
      },
      title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
        paddingBottom: 20,
    },
})