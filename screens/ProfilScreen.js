import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { SignOut } from '../reducers/user'
import SelectionSport from '../components/SelectionSport';

const ProfilScreen = ({ navigation }) => {
    const connectedUser = useSelector((state) => state.user.value);
    let dispatch = useDispatch()

    // //Calculate age of user according to date of birth
    const getAge = (dob) => {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age
    }
    let calculatedAge = getAge(connectedUser.dateOfBirth)

    let userSportList = []
    if (connectedUser.email) {
        userSportList = connectedUser.preferences.sports.map((e, i) => {
            return (
                <View key={i} style={{ marginRight: 10 }}>
                    <SelectionSport name={e.name} icon={e.icon} />
                </View>
            )
        });
    }

    //On logging out, reset user store and navigate to ConnectionAllScreen 
    const handleLogout = () => {
        dispatch(SignOut());
        navigation.navigate('ConnectionAll')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon profil</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} />
                </View>
            </View>

            <View style={styles.infosUser}>
                <View style={styles.avatarContainer}>
                    <Image title="avatar" src={connectedUser.avatar} style={styles.avatar} />
                </View>
                <View style={styles.infosUserText}>
                    <Text style={styles.textName}>{connectedUser.firstname}</Text>
                    <Text style={styles.textAge}>{calculatedAge} ans</Text>
                    <Text style={styles.nbrActivities}>Activités réalisées : 322</Text>
                    <Text style={styles.nbrActivities}>Activités proposées : 2</Text>

                </View>
            </View>
            <TouchableOpacity style={styles.modifButton} activeOpacity={0.8}>
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
            </View>

            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => handleLogout()} style={styles.deconnexionButton} activeOpacity={0.8}>
                    <Text style={styles.textDeconnectButton}>Se deconnecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.legalInfosButton} activeOpacity={0.8}>
                    <Text style={styles.textLegalButton}>infos légales</Text>
                </TouchableOpacity>
            </View>
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
    },
    avatar: {
        borderRadius: 60,
        width: 115,
        height: 115,
        marginRight: 15,
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