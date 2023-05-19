import React, { useState, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, StyleSheet, DateInput } from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const avatarIconList = [
    'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png',
    'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar2_nmbj4l.png',
    'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar3_jzjn5u.png',
    'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar4_ug3mjt.png',
    'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar5_ywvehs.png',
    'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar6_gvkxhz.png',
]

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegex = new RegExp(/(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}/)


// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['date'])



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
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [showModalDate, setShowModalDate] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [avatar, setAvatar] = useState(avatarIconList[0])
    
    //!\ DATE PICKER DOES NOT WORK
    // const selectDate = (event, selectedDate) => {
    //     const dob = selectedDate || dateOfBirth
    //     setDateOfBirth(dob)
    // }

    // let dateModal = <DateTimePicker 
    //     mode="date" 
    //     display="calendar" 
    //     value ={dateOfBirth}
    //     //onChange={selectDate()}
    //     onSubmit={(date) => {
    //         setDateOfBirth(date)
    //         setShowModalDate(false)
    //     }}
    // />

   
    
    //Validate user info
    const handleValidate = () => {
        //Check if all fields are valid and if not add error text underneath input

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
        navigation.navigate('SignUpPreferences', {username, firstname, lastname, email, phone, dateOfBirth, password, avatar})
    }
    
    //!\change style of inputs according to whether error or not 
    
    return (
        <View style={styles.container}>
            {/* Change navigation destination to connection page */}
            <TouchableOpacity onPress={() => navigation.navigate()}>
                <Feather name='arrow-left' size={25} color='#D9D9D9' />
            </TouchableOpacity>
            <Text style={styles.title}>Rejoins nous !</Text>
            <View style={styles.userContainer}>
                {/* Add possibility to choose image from list */}
                <Image title="avatar" src={avatar} style={styles.avatar} />
                <View style={styles.userNameContainer}>
                    <Text>Nom d'utilisateur* :</Text>
                    <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageLeft='search_icon'
                        inlineImagePadding={10}
                        inputMode='none'
                        placeholder="Mon nom d'utilisateur"
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                    />
                    {usernameError && <Text style={[styles.error, { alignSelf: 'flex-start' }]}>{usernameErrorTxt}</Text>}
                </View>
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
                </View>
                {firstnameError && <Text style={styles.error}>Entrer un prénom</Text>}
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
                </View>
                {lastnameError && <Text style={styles.error}>Entrer un nom</Text>}
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
                {emailError && <Text style={styles.error}>{emailErrorTxt}</Text>}
                <View style={styles.inputPair}>
                    <Text>Confirmer mon email* :</Text>
                    <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageLeft='search_icon'
                        inlineImagePadding={10}
                        autoCapitalize="none"
                        inputMode='email'
                        placeholder="Confirmer mon mail"
                        onChangeText={(value) => setConfirmEmail(value)}
                        value={confirmEmail}
                    />
                </View>
                {confirmEmailError && <Text style={styles.error}>Addresses mails différentes</Text>}
                <View style={styles.inputPair}>
                    <Text>Téléphone :</Text>
                    <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageLeft='search_icon'
                        inlineImagePadding={10}
                        inputMode='tel'
                        placeholder="0600000000"
                        onChangeText={(value) => setPhone(value)}
                        value={phone}
                    />
                </View>
                <View style={styles.inputPair}>
                    <Text>Date de naissance* :</Text>
                    {/* Add popup for date on click */}
                    <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageLeft='search_icon'
                        inlineImagePadding={10}
                        placeholder="JJ/MM/AA"
                        // onChangeText={(value) => setDateOfBirth(value)}
                        //onFocus={() => setShowModalDate(true)}
                        value={dateOfBirth}
                    />
                </View>
                <View style={styles.inputPair}>
                    <Text>Mon mot de passe* :</Text>
                    {/* Add eye to view password on click */}
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
                {passwordError && <Text style={styles.error}>Entrer un mot de passe qui contient au moins un chiffre, une minuscule, un caractère spécial et qui fait au moins 8 caractères</Text>}
                <View style={styles.inputPair}>
                    <Text style={styles.inputLabel}>Confirmer mon mot de passe* :</Text>
                    {/* Add eye to view password on click */}
                    <TextInput
                        style={styles.input}
                        // Change image in input bar
                        inlineImageRight='search_icon'
                        inlineImagePadding={10}
                        autoCapitalize="none"
                        inputMode='text'
                        placeholder="********"
                        secureTextEntry={true}
                        onChangeText={(value) => setConfirmPassword(value)}
                        value={confirmPassword}
                    />
                </View>
                {confirmPasswordError && <Text style={styles.error}>Mots de passe différents</Text>}
            </View>
            <TouchableOpacity style={styles.validateBtn} onPress={() => handleValidate()}>
                <Text style={styles.validateBtnTxt}>Valider mes informations</Text>
            </TouchableOpacity>
            {/* {showModalDate && dateModal} */}
        </View>
    )
}

export default SignupJoinScreen

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
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginRight: 15,
    },
    userNameContainer: {
        justifyContent: 'flex-start',
        width: '100%'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,

    },
    inputPair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,

    },
    inputLabel: {
        width: 100,
    },
    input: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        width: 150,
        fontSize: 12,
    },
    validateBtn: {
        backgroundColor: '#121C6E',
        padding: 10,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    validateBtnTxt: {
        color: 'white',
    },
    error: {
        color: 'red',
        fontSize: 10,
        width: 150,
        fontStyle: 'italic',
        alignSelf: 'flex-end',
    },
})