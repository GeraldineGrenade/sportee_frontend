import React, { useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch } from 'react-redux';
import { signIn } from '../reducers/user';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default ConnectionMailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let dispatch = useDispatch();

    handleLogin = () => {
        //Verify if fields are not empty
        if (email === '' || password === '') {
            setError(true)
            return
        } else {
            setError(false)
        }

        fetch('https://sportee-backend.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if(data.result) {
                    dispatch(signIn(data.user))
                    navigation.navigate("Recherche")
                    setError(false)
                } else {
                    setError(true)
                }
            });
        setEmail('');
        setPassword('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('ConnectionAll')}>
                <Feather name='arrow-left' size={25} color='#D9D9D9' />
            </TouchableOpacity>
            <View style={styles.connectionContainer}>
                <Text style={styles.title}>CONNEXION</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Feather name='mail' style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            inputMode='email'
                            autoCapitalize="none"
                            placeholder="Mon adresse mail"
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                        />
                    </View>
                    <View style={styles.input}>
                        <FontAwesome5 name='key' style={styles.icon} />
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize="none"
                            inputMode='text'
                            placeholder="Mon mot de passe"
                            secureTextEntry={true}
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                        />
                    </View>
                    <Text style={styles.forgotten}>Mot de passe oublié ?</Text>
                    {error && <Text style={styles.error}>Email ou mot de passe incorrect</Text>}
                </View>
                <TouchableOpacity style={styles.connectBtn} onPress={() => handleLogin()}>
                    <Text style={styles.connectBtnTxt}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    backBtn: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 180,
    },
    connectionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
        marginBottom: 40,
    },
    connectBtn: {
        backgroundColor: '#121C6E',
        padding: 15,
        width: 250,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    connectBtnTxt: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        width: 250,
        height: 30,
    },
    icon: {
        color: '#D9D9D9',
        marginRight: 5,
    },
    inputText: {
        fontSize: 14,
    },
    inputContainer: {
        marginBottom: 15,
    },
    forgotten: {
        color: '#121C6E',
        alignSelf: 'flex-end',
        fontSize: 12,
        marginBottom: 5,
    },
    error: {
        color: 'red',
        fontSize: 12,
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },

});