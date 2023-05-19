import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import SelectionSport from '../components/SelectionSport';

//{"__v": 0, "_id": "64662968107a0fa2af912a63", "avatar": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar2_nmbj4l.png", "badges": [], "dateOfBirth": "2023-05-18T13:32:43.005Z", "description": "", "email": "geraldine.grenade@gmail.com", "firstname": "Géraldine", "lastname": "Grenade", "password": "$2b$10$A9LolEoehFP/dBJoGrkyvO4zwKLV3LaCej1UxhHg98Ht7A96lcDXG", "phone": "", "preferences": {"_id": "64662968107a0fa2af912a64", "habits": ["Le weekend"], "level": "Sportif du dimanche", "sports": [[Object], [Object], [Object]]}, "token": "8nTLZ_0xKgPdKA18iVRmbkgNkFcbzaTG", "username": "GG"}


const ProfilScreen = ({ navigation }) => {
    const connectedUser = useSelector((state) => state.user.value);
    console.log(connectedUser)
    
    // let dob=connectedUser.dateOfBirth
    // let calculatedAge
    // //Calculate age of user according to date of birth
    //     function getAge (dob) {
    //     let today = new Date();
    //     //var birthDate = new Date(dateString);
    //     calculatedAge = today.getFullYear() - dob.getFullYear();
    //     let m = today.getMonth() - dob.getMonth();
    //     if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    //         calculatedAge--;
    //     }
    //     // return age;
    // }

    let userSportList = connectedUser.preferences.sports.map((e, i) => {
        return <SelectionSport key={i} name={e.name} icon={e.icon} />
    })

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon profil</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')} />
                </View>
            </View>

            <View style={styles.infosUser}>
                <View>
                    <Image title="avatar" src={connectedUser.avatar} style={styles.avatar} />
                    <View style={styles.plusContainer}><Text style={styles.plus}>+</Text></View>
                </View>
                <View style={styles.infosUserText}>
                    <Text style={styles.textName}>{connectedUser.firstname}</Text>
                    <Text style={styles.textAge}>30 ans</Text>
                    {/* Adapt number of activities according to activities store*/}
                    <Text style={styles.nbrActivities}>Activités réalisées : 322</Text>
                    <Text style={styles.nbrActivities}>Activités proposées : 2</Text>

                </View>
            </View>
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.modifButton} activeOpacity={0.8}>
                <Text style={styles.textButton}>Modifier le profil</Text>
            </TouchableOpacity>
            <View style={styles.favoris}>
                <Text style={styles.subtitleFav}>Mes sports favoris : </Text>
                <View style={styles.favoriteSport}>
                    <View style={styles.sportContent}></View>
                    <View style={styles.sportContent}></View>
                    <View style={styles.sportContent}></View>
                    <View style={styles.sportContent}></View>
                </View>

            </View>
            <View style={styles.description}>
                <Text style={styles.subtitleDesc}>Ma description : </Text>
                <TextInput style={styles.input} placeholder='Votre description' maxLength={280}></TextInput>
                <Text style={styles.counter}>/280</Text>
            </View>

            <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.deconnexionButton} activeOpacity={0.8}>
                    <Text style={styles.textDeconnectButton}>Se deconnecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.legalInfosButton} activeOpacity={0.8}>
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
        backgroundColor: '#f2f2f2',
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

    avatar: {
        borderRadius: 60,
        width: 115,
        height: 115,
        marginRight: 15,
    },

    plus: {
        color: '#f8f8ff',
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 6,
        paddingBottom: 7,
    },

    plusContainer: {
        backgroundColor: '#A4ABB0',
        borderRadius: 50,
        width: 25,
        height: 25,
        marginLeft: 80,
        // marginTop: 5,
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

    // userPhotoContainer: {
    //     backgroundColor: '#A4ABB0',
    //     borderRadius: 60,
    //     width: 115,
    //     height: 115,
    //     padding: 30,
    //     },

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
        marginLeft: 33,
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
        borderColor: '#000',
        borderRadius: 10,
        height: 150,
        width: '92%',
        borderWidth: 1,

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
        marginTop: 80,
    },

    favoriteSport: {
        flexDirection: 'row',
    },

    sportContent: {
        borderColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        height: 60,
        width: 60,
        marginRight: 10
    },

});