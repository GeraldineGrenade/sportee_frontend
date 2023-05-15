import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const avatarIconList = [
    '../assets/avatar-icons/avatar1.png',
    '../assets/avatar-icons/avatar2.png',
    '../assets/avatar-icons/avatar3.png',
    '../assets/avatar-icons/avatar4.png',
    '../assets/avatar-icons/avatar5.png',
    '../assets/avatar-icons/avatar6.png',
]

const EMAIL_REGEX = new RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


const SignupJoinScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorTxt, setUsernameErrorTxt] = useState('');
    const [firstname, setFirstname] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('')
    const [telephone, setTelephone] = useState(0);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleValidate = () => {
        
        //Check if all fields are valid and if not add error text
        if (username === '') {
            setUsernameError(true);
            setUsernameErrorTxt("Entrer un nom d'utilisateur");
            return
        } 
        fetch(`https://sportee-backend.vercel.app/users/checkUsername:${username}`)
        .then(response => response.json)
        .then(data => {
            !data.result ? (setUsernameError(true), setUsernameErrorTxt("Nom d'utilisateur déjà pris, choisis-en un autre !")) : (setUsernameError(false), setUsernameErrorTxt(''))
        })

        if (firstname === '') {
            setFirstnameError(true);
            return
        } else {
            setFirstnameError(false)
        }

        if (lastname === '') {
            setLastnameError(true);
            return
        } else {
            setLastnameError(false)
        }

        

        //if all input are correct, navigate to preference page with info in route
        
        {/* Change navigation destination to preferences page */}
        navigation.navigate('navigate', {username, firstname, lastname, email, telephone, dateOfBirth, password})
    }

    //change style of inputs according to whether error or not 

    return (
        <View style={styles.container}>
            {/* Change navigation destination to connection page */}
            <TouchableOpacity onPress={() => navigation.navigate()}>
                <Feather name='arrow-left' size={25} color='black' />
            </TouchableOpacity>
            <Text style={styles.title}>Rejoins nous !</Text>
            <View style={styles.userContainer}>
                {/* Add possibility to choose image from list */}
                <Image source={require(avatarIconList[1])} style={styles.avatar} />
                <View style={styles.userNameContainer}>
                    <Text>Nom d'utilisateur* :</Text>
                    <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageLeft='search_icon'
                        inlineImagePadding={10}
                        inputMode='text'
                        placeholder="Mon nom d'utilisateur"
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                    />
                    {usernameError && <Text style={styles.error}>{usernameErrorTxt}</Text>}

                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputPair}>
                        <Text>Prénom* :</Text>
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageLeft='search_icon'
                            inlineImagePadding={10}
                            inputMode='text'
                            autoComplete='given-name'
                            placeholder="Mon prénom"
                            onChangeText={(value) => setFirstname(value)}
                            value={firstname}
                        />
                        {firstnameError && <Text style={styles.error}>Entrer un prénom</Text>}
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Nom* :</Text>
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageLeft='search_icon'
                            inlineImagePadding={10}
                            inputMode='text'
                            autoComplete='family-name'
                            placeholder="Mon nom"
                            onChangeText={(value) => setLastname(value)}
                            value={lastname}
                        />
                        {lastnameError && <Text style={styles.error}>Entrer un nom</Text>}
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Email* :</Text>
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageLeft='search_icon'
                            inlineImagePadding={10}
                            autoCapitalize="none"
                            inputMode='email'
                            autoComplete="email" 
                            placeholder="Mon adresse mail"
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                        />
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Confirmer mon email* :</Text>
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageLeft='search_icon'
                            inlineImagePadding={10}
                            inputMode='email'
                            placeholder="Confirmer mon adresse mail"
                            onChangeText={(value) => setConfirmEmail(value)}
                            value={confirmEmail}
                        />
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Téléphone :</Text>
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageLeft='search_icon'
                            inlineImagePadding={10}
                            inputMode='tel'
                            placeholder="06 00 00 00 00"
                            onChangeText={(value) => setTelephone(value)}
                            value={telephone}
                        />
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Date de naissance :</Text>
                        {/* Add popup for date on click */}
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageLeft='search_icon'
                            inlineImagePadding={10}
                            placeholder="JJ/MM/AA"
                            onChangeText={(value) => setDateOfBirth(value)}
                            value={dateOfBirth}
                        />
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Mon mot de passe :</Text>
                        {/* Add eye to view password on click */}
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageRight='search_icon'
                            inlineImagePadding={10}
                            inputMode='text'
                            placeholder="********"
                            secureTextEntry={true}
                            onChangeText={(value) => setPassword(value)}
                            value={password}
                        />
                    </View>
                    <View style={styles.inputPair}>
                        <Text>Confirmer mon mot de passe :</Text>
                        {/* Add eye to view password on click */}
                        <TextInput
                            style={styles.input}
                            // Change image in input bar
                            inlineImageRight='search_icon'
                            inlineImagePadding={10}
                            inputMode='text'
                            placeholder="********"
                            secureTextEntry={true}
                            onChangeText={(value) => setConfirmPassword(value)}
                            value={confirmPassword}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.validateBtn} onPress={() => handleValidate()}>
                    <Text style={styles.validateBtnTxt}>Valider mes informations</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupJoinScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "white",
        alignItems: 'center',
        paddingRight: 30,
        paddingLeft: 30,
        width: '100%',
        height: '100%',
    },
    title: {
        paddingTop: 30,
        paddingBottom: 30,
        color: '#EA7810',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    avatar: {
        borderRadius: '50%'
    },
    userNameContainer: {
        justifyContent: 'flex-start',
    },
    input: {

    },
    inputContainer: {
        width: '100%'
    },
    inputPair: {
        justifyContent: 'space-between',
        width: '100%'
    },
    validateBtn : {
        backgroundColor: '#121C6E',
        padding: 10,
        width : '80%',
    }, 
    validateBtnTxt: {
        color: 'white',
    },
    error: {
        color: 'red',
    },
})