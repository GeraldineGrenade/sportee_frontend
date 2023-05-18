import React, { useState } from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useDispatch } from 'react-redux';
import { signIn } from '../reducers/user';


export default ConnectionMailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let dispatch = useDispatch();

    handleLogin = () => {
        //Verify if fields are not empty
        if(email === '' || password === '') {
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
            data.result && dispatch(signIn(data.user))
            navigation.navigate("TabNavigator")    
        });
        setEmail('');
        setPassword('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image />
            <Text style={styles.title}>CONNEXION</Text>
            <View>
                <TextInput
                    style={styles.input}
                    // Change image in input bar
                    inlineImageLeft='search_icon'
                    inlineImagePadding={10}
                    inputMode='email'
                    placeholder="Mon adresse mail"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                />
                <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageRight='search_icon'
                        inlineImagePadding={10}
                        autoCapitalize="none"
                        inputMode='text'
                        placeholder="********"
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />
            </View>
            <Text style={styles.forgotten}>Mot de passe oublié ?</Text>
            {error && <Text style={styles.error}>Email ou mot de passe incorrect</Text>}
            <TouchableOpacity style={styles.connectBtn} onPress={() => handleLogin()}>
                <Text style={styles.connectBtnTxt}>Se connecter</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
    },
    connectBtn: {
        backgroundColor: '#121C6E',
        padding: 10,
        width: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    connectBtnTxt: {
        color: 'white',
        fontSize: 18,
    },
    input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        width: 150,
        fontSize: 12,
    },
    forgotten: {
        color: '#121C6E',
    },
    error: {
        color: 'red',
        fontSize: 10,
        width: 150,
        fontStyle: 'italic',
        // alignSelf: 'flex-end',
    },

});