import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { SignOut } from '../reducers/user'
import SelectionSport from '../components/SelectionSport';
import ModaleAvatars from '../components/ModaleAvatars';
import ModifyProfile from '../components/ModifyProfile';


//{"__v": 0, "_id": "64662968107a0fa2af912a63", "avatar": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar2_nmbj4l.png", "badges": [], "dateOfBirth": "2023-05-18T13:32:43.005Z", "description": "", "email": "geraldine.grenade@gmail.com", "firstname": "Géraldine", "lastname": "Grenade", "password": "$2b$10$A9LolEoehFP/dBJoGrkyvO4zwKLV3LaCej1UxhHg98Ht7A96lcDXG", "phone": "", "preferences": {"_id": "64662968107a0fa2af912a64", "habits": ["Le weekend"], "level": "Sportif du dimanche", "sports": [[Object], [Object], [Object]]}, "token": "8nTLZ_0xKgPdKA18iVRmbkgNkFcbzaTG", "username": "GG"}


const ProfilScreen = ({ navigation }) => {
    const connectedUser = useSelector((state) => state.user.value);
    // const [avatar, setAvatar] = useState(connectedUser.avatar)
    const [showModalAvatar, setShowModalAvatar] = useState(false);
    const [isModifying, setIsModifying] = useState(false);
    let dispatch = useDispatch()

    // //Calculate age of user according to date of birth
    const getAge = (dob) => {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age
    }
    let calculatedAge = getAge(connectedUser.dateOfBirth)

    //On closing avatar modal, set new avatar to chosen one
    const closeAvatarModal = (avatar) => {
        setShowModalAvatar(false)
        setAvatar(avatar)
    }

    let userSportList = []
    if (connectedUser.email) {
        userSportList = connectedUser.preferences.sports.map((e, i) => {
            return (
                <View key={i} style={{marginRight: 10}}>
                    <SelectionSport name={e.name} icon={e.icon} />
                </View>
            )
        });
    } 

    // for (let i = 0; i < (4 - userSportList.length); i++) {
    //     userSportList.push(<SelectionSport />)
    // }

    //On validating modifications in ModifyProfile component, render normal profile
    const closeModifyProfile = () => {
        setIsModifying(false)
    }

    //On logging out, reset user store and navigate to ConnectionAllScreen /!\ To adapt to be able to navigate to Homescreen - nested navigation to figure out
    const handleLogout = () => {
        dispatch(SignOut());
        navigation.navigate('ConnectionAll')
    }

    //On click on the modify button, render ModifyProfile component
    if (isModifying) {
        return <ModifyProfile closeModifyProfile={closeModifyProfile} />
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon profil</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')} />
                </View>
            </View>

            <View style={styles.infosUser}>
                <View style={styles.avatarContainer}>
                    <Image title="avatar" src={connectedUser.avatar} style={styles.avatar} />
                    {/* <TouchableOpacity onPress={() => setShowModalAvatar(true)}>
                        <FontAwesome5 name='pen' style={styles.modifyIAvatar} />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.infosUserText}>
                    <Text style={styles.textName}>{connectedUser.firstname}</Text>
                    <Text style={styles.textAge}>{calculatedAge} ans</Text>
                    {/* Adapt number of activities according to activities store*/}
                    <Text style={styles.nbrActivities}>Activités réalisées : 322</Text>
                    <Text style={styles.nbrActivities}>Activités proposées : 2</Text>

                </View>
            </View>
            <TouchableOpacity onPress={() => setIsModifying(true)} style={styles.modifButton} activeOpacity={0.8}>
                <Text style={styles.textButton}>Modifier le profil</Text>
            </TouchableOpacity>
            <View style={styles.favoris}>
                <Text style={styles.subtitleFav}>Mes sports favoris : </Text>
                <View style={styles.favoriteSport}>
                    {userSportList}
                </View>

            </View>
            <View style={styles.description}>
                <Text style={styles.subtitleDesc}>Ma description : </Text>
                <Text style={styles.input}>{connectedUser.description !== '' ? connectedUser.description : "Vous n'avez pas de description pour l'instant"}</Text>
                {/* <Text style={styles.counter}>/280</Text> */}
            </View>

            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => handleLogout()} style={styles.deconnexionButton} activeOpacity={0.8}>
                    <Text style={styles.textDeconnectButton}>Se deconnecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.legalInfosButton} activeOpacity={0.8}>
                    <Text style={styles.textLegalButton}>infos légales</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showModalAvatar} animationType="fade" transparent>
                <ModaleAvatars closeAvatarModal={closeAvatarModal} />
            </Modal>
        </SafeAreaView>
    )
}

export default ProfilScreen



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 27.5,
        marginLeft: 27.5,
        marginTop: 30,
        marginBottom: 10,
    },

    userIconContainer: {
        flexDirection: 'row',
        backgroundColor: '#EA7810',
        borderRadius: 50,
        width: 42,
        height: 42,
        padding: 8,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginRight: 35,
    },
    avatar: {
        borderRadius: 60,
        width: 115,
        height: 115,
        marginRight: 15,
    },
    modifyIAvatar: {
        color: '#D9D9D9',
        marginLeft: -30,
        fontSize: 15,
    },

    infosUser: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
    },

    infosUserText: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        color: '#000000',
        fontSize: 14,
    },

    userIcon: {
        marginLeft: 4,
    },

    textButton: {
        color: '#f8f8ff',
        fontSize: 14,
        padding: 6.5,
        paddingLeft: 9,
    },

    textDeconnectButton: {
        color: '#000000',
        fontSize: 14,
        padding: 6.5,
        paddingLeft: 9,
    },

    textLegalButton: {
        color: '#000000',
        fontSize: 14,
        padding: 6.5,
        paddingLeft: 9,
        textDecorationLine: 'underline',
    },

    modifButton: {
        backgroundColor: '#121C6E',
        borderRadius: 5,
        width: '30%',
        height: 30,
        marginTop: 20,
        marginLeft: 27.5,
    },

    legalInfosButton: {
        marginRight: 27.5,
        marginTop: 20,
    },

    deconnexionButton: {
        borderColor: '#121C6E',
        borderWidth: 1,
        borderRadius: 5,
        width: '30%',
        height: 30,
        marginTop: 20,
        marginLeft: 33,
    },

    favoris: {
        fontSize: 16,
        color: '#EA7810',
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 27.5,
    },

    description: {
        marginBottom: 40,
        marginLeft: 27.5,
    },

    input: {
        color: 'grey',
        borderColor: '#D9D9D9',
        borderRadius: 10,
        height: 150,
        width: '92%',
        borderWidth: 1,
        padding: 10,
    },

    counter: {
        marginTop: 5,
        fontSize: 10,
        alignSelf: 'flex-end',
        marginRight: 40,
    },

    subtitleDesc: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA7810',
        marginBottom: 10,
    },

    subtitleFav: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA7810',
        marginBottom: 10,
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    favoriteSport: {
        flexDirection: 'row',
    },
});