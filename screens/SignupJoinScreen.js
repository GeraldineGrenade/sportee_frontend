import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, StyleSheet, KeyboardAvoidingView, Modal } from 'react-native';
import ModaleAvatars from '../components/ModaleAvatars';
import DateTimePicker from '@react-native-community/datetimepicker'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegex = new RegExp(/(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}/)

const SignupJoinScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorTxt, setUsernameErrorTxt] = useState('');
    const [firstname, setFirstname] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorTxt, setEmailErrorTxt] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [confirmEmailError, setConfirmEmailError] = useState(false);
    const [phone, setPhone] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateString, setDateString] = useState('JJ/MM/AA')
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [avatar, setAvatar] = useState('https://res.cloudinary.com/dsd7uux0v/image/upload/v1684574546/sportee/user_uu2pdu.png');
    const [showModalAvatar, setShowModalAvatar] = useState(false);
    const [isAvoiding, setIsAvoiding] = useState(false);


    //On closing avatar modal, set new avatar to chosen one
    const closeAvatarModal = (avatar) => {
        setShowModalAvatar(false)
        setAvatar(avatar)
    }

    //Date picker
    const onDateSelected = (event, value) => {
        setDateOfBirth(value);
        let date = value.getDate()
        if (date < 10) {
            date = '0'+date
        }
        let month = value.getMonth()+1
        if (month < 10) {
            month = '0'+month
        }
        setDateString(date + '/' + month  + '/' + value.getFullYear());
        setDatePicker(false);
    };

    //Validate user info - Check if all fields are valid and if not add error text underneath input
    const handleValidate = () => {

        //Check username
        if (username === '') {
            setUsernameError(true);
            setUsernameErrorTxt("Entrer un nom d'utilisateur");
            return
        }
        fetch(`https://sportee-backend.vercel.app/users/checkUsername/${username}`)
            .then(response => response.json())
            .then(data => {
                if (!data.result) {
                    setUsernameError(true)
                    setUsernameErrorTxt("Nom d'utilisateur déjà pris, choisis-en un autre !")
                    return
                } else {
                    setUsernameError(false)
                    setUsernameErrorTxt('')
                }
            })

        //Check firstname    
        if (firstname === '') {
            setFirstnameError(true);
            return
        } else {
            setFirstnameError(false)
        }

        //Check lastname
        if (lastname === '') {
            setLastnameError(true);
            return
        } else {
            setLastnameError(false)
        }

        //Check email
        if (!emailRegex.test(email)) {
            setEmailError(true)
            setEmailErrorTxt("Entrer une addresse mail valide")
            return
        } else {
            fetch(`https://sportee-backend.vercel.app/users/checkEmail/${email}`)
                .then(response => response.json())
                .then(data => {
                    if (!data.result) {
                        setEmailError(true)
                        setEmailErrorTxt("Email déjà utilisé, choisis-en un autre")
                        return
                    } else {
                        setEmailError(false)
                        setEmailErrorTxt('')
                    }
                })
        }

        //Check confirm mail
        if (email !== confirmEmail) {
            setConfirmEmailError(true)
            return
        } else {
            setConfirmEmailError(false)
        }

        //Check date 
        if (dateOfBirth.getFullYear() === new Date().getFullYear()) {
            setDateOfBirthError(true);
            return
        } else {
            setDateOfBirthError(false)
        }

        //Check password
        if (!passwordRegex.test(password)) {
            setPasswordError(true)
            return
        } else {
            setPasswordError(false)
        }

        //Check confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError(true)
            return
        } else {
            setConfirmPasswordError(false)
        }

        //if all input are correct, navigate to preference page with info in route.params
        navigation.navigate('SignUpPreferences', { username, firstname, lastname, email, phone, dateOfBirth, password, avatar })
    }

    return (
        <KeyboardAvoidingView
            style={isAvoiding ? styles.avoidingContainer : styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} >

            <View >
                <TouchableOpacity onPress={() => navigation.navigate('ConnectionAll')}>
                    <Feather name='arrow-left' size={25} color='#D9D9D9' />
                </TouchableOpacity>
                <Text style={styles.title}>Rejoins nous !</Text>
                <View style={styles.userContainer}>
                    <View style={styles.avatarContainer}>
                        <Image title="avatar" src={avatar} style={styles.avatar} />
                        <TouchableOpacity onPress={() => setShowModalAvatar(true)}>
                            <FontAwesome5 name='pen' style={styles.modifyIAvatar} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userNameContainer}>
                        <Text style={[styles.inputLabel, { marginBottom: 10 }]}>Nom d'utilisateur* :</Text>
                        <View style={styles.input}>
                            <FontAwesome name='user' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                inputMode='none'
                                placeholder="Mon nom d'utilisateur"
                                onChangeText={(value) => setUsername(value)}
                                value={username}
                            />
                        </View>
                        {usernameError && <Text style={[styles.error, { alignSelf: 'flex-start' }]}>{usernameErrorTxt}</Text>}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Prénom* :</Text>
                        <View style={styles.input}>
                            <FontAwesome name='user' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                inputMode='text'
                                autoComplete='given-name'
                                placeholder="Mon prénom"
                                onChangeText={(value) => setFirstname(value)}
                                value={firstname}
                            />
                        </View>
                    </View>
                    {firstnameError && <Text style={styles.error}>Entrer un prénom</Text>}
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Nom* :</Text>
                        <View style={styles.input}>
                            <FontAwesome name='user' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                inputMode='text'
                                autoComplete='family-name'
                                placeholder="Mon nom"
                                onChangeText={(value) => setLastname(value)}
                                value={lastname}
                            />
                        </View>
                    </View>
                    {lastnameError && <Text style={styles.error}>Entrer un nom</Text>}
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Email* :</Text>
                        <View style={styles.input}>
                            <Foundation name='mail' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                inputMode='email'
                                autoComplete="email"
                                placeholder="Mon adresse mail"
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                            />
                        </View>
                    </View>
                    {emailError && <Text style={styles.error}>{emailErrorTxt}</Text>}
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Confirmer mon mail* :</Text>
                        <View style={styles.input}>
                            <Foundation name='mail' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                inputMode='email'
                                placeholder="Confirmer mon mail"
                                onFocus={() => setIsAvoiding(true)}
                                onBlur={() => setIsAvoiding(false)}
                                onChangeText={(value) => setConfirmEmail(value)}
                                value={confirmEmail}
                            />
                        </View>
                    </View>
                    {confirmEmailError && <Text style={styles.error}>Addresses mails différentes</Text>}
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Téléphone :</Text>
                        <View style={styles.input}>
                            <FontAwesome name='phone' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                inputMode='tel'
                                placeholder="0600000000"
                                onFocus={() => setIsAvoiding(true)}
                                onBlur={() => setIsAvoiding(false)}
                                onChangeText={(value) => setPhone(value)}
                                value={phone}
                            />
                        </View>
                    </View>
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Date de naissance* :</Text>
                        <View style={styles.input}>
                            <FontAwesome5 name='calendar-alt' style={styles.inputIcon} />
                            {datePicker && (
                                <DateTimePicker
                                    value={dateOfBirth}
                                    mode='date'
                                    display='default'
                                    // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onDateSelected}
                                />
                            )}
                            {!datePicker && (
                                <View>
                                    <TouchableOpacity onPress={() => setDatePicker(true)}>
                                        <Text style={styles.inputText}>{dateString}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    {dateOfBirthError && <Text style={styles.error}>Entrer une date de naissance conforme</Text>}
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Mon mot de passe* :</Text>
                        {/* Add eye to view password on click */}
                        <View style={styles.input}>
                            <FontAwesome5 name='key' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                inputMode='text'
                                placeholder="Mon mot de passe"
                                onFocus={() => setIsAvoiding(true)}
                                onBlur={() => setIsAvoiding(false)}
                                secureTextEntry={true}
                                onChangeText={(value) => setPassword(value)}
                                value={password}
                            />
                        </View>
                    </View>
                    {passwordError && <Text style={styles.error}>Entrer un mot de passe qui contient au moins un chiffre, une minuscule, un caractère spécial et qui fait au moins 8 caractères</Text>}
                    <View style={styles.inputPair}>
                        <Text style={styles.inputLabel}>Confirmer mon mot de passe* :</Text>
                        {/* Add eye to view password on click */}
                        <View style={styles.input}>
                            <FontAwesome5 name='key' style={styles.inputIcon} />
                            <TextInput
                                style={styles.inputText}
                                autoCapitalize="none"
                                inputMode='text'
                                placeholder="Confirmer mot de passe"
                                secureTextEntry={true}
                                onFocus={() => setIsAvoiding(true)}
                                onBlur={() => setIsAvoiding(false)}
                                onChangeText={(value) => setConfirmPassword(value)}
                                value={confirmPassword}
                            />
                        </View>
                    </View>
                    {confirmPasswordError && <Text style={styles.error}>Mots de passe différents</Text>}
                </View>
                <Text style={styles.obligatoire}>* Champs obligatoires</Text>
                <TouchableOpacity style={styles.validateBtn} onPress={() => handleValidate()}>
                    <Text style={styles.validateBtnTxt}>Valider mes informations</Text>
                </TouchableOpacity>
                <Modal visible={showModalAvatar} animationType="fade" transparent>
                    <ModaleAvatars closeAvatarModal={closeAvatarModal} />
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignupJoinScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 60,
        width: '100%',
        height: '100%',
    },
    avoidingContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 60,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
        paddingBottom: 35,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,

    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginRight: 35,
    },
    avatar: {
        borderRadius: 50,
        width: 130,
        height: 130,
    },
    modifyIAvatar: {
        color: '#D9D9D9',
        marginLeft: -15,
        fontSize: 15,
    },
    userNameContainer: {
        justifyContent: 'flex-start',
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,

    },
    inputPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,

    },
    inputIcon: {
        color: '#D9D9D9',
        marginRight: 5,
    },
    inputText: {
        fontSize: 14,
        color: '#ADABAB',

    },
    inputLabel: {
        width: 150,
        fontSize: 15,
        flexWrap: 'wrap',
    },
    input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        width: 190,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 30,
    },
    obligatoire: {
        marginTop: 20,
        fontStyle: 'italic',
        color: '#D9D9D9',
    },
    validateBtn: {
        backgroundColor: '#121C6E',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    validateBtnTxt: {
        color: 'white',
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 10,
        width: 150,
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },
})