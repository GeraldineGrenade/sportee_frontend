import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

//      fetch('https://sportee-backend.vercel.app/activities')
//     .then(response => {
//         if (response.ok) {
//             response.json()
//         }else {
//             throw new Error('Erreur lors de la récupération de l\'activité')
//         }
//     }).then(data => {
//         console.log(data);
//     }).catch(error => {
//         console.error(error);
//     })

const ActivityScreen = ({ navigation, route }) => {

    //Get activity info from previous page
    const currentActivity = route.params

    //To replace with data from route.params
    const participants = [
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar3_jzjn5u.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar4_ug3mjt.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar5_ywvehs.png',
    ]

 

    const participantList = participants.map((data, i) => {
        return <Image key={i} title="avatar" src={data} style={styles.avatar} />
    })
    
    //Number of places left in activity - to replace with data from route.params
    const remainingPlaces = 5-participants.length
    for(let i=0; i<remainingPlaces; i++) {
        participantList.push(<View style={styles.emptyAvatar}></View>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Piscine à la cool</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')} />
                </View>
            </View>
            <View style={styles.activityCreator}>
                <Text style={styles.creatorName}>Proposée par Camille</Text>
                <Image title="avatar" src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png' style={styles.avatar} />

            </View>
            <View style={styles.photoAddressLevelContainer}>
                <View >
                    <Image style={styles.sportPhoto} source={require('../assets/sport-photos/yoga.jpg')}/>
                    <Text style={styles.sportName}>Piscine</Text>
                </View>
                <View style={styles.addressLevelContainer}>
                    <FontAwesome name='map-pin' size={15} color='#000' />
                    <Text style={styles.address}>36 Av. Marx Dormoy, 59000 Lille</Text>
                    <Text style={styles.level}>Débutant</Text>
                </View>
            </View>
            <View style={styles.dateTimeContainer}>
                <View style={styles.dateTimeItem}>
                    <FontAwesome5 name='calendar-alt' size={20} color='#000' />
                    <Text style={styles.dateTimeTxt} >Dimanche 11 Juin 15h</Text>
                </View>
                <View style={styles.dateTimeItem}>
                    <Ionicons name='timer-outline' size={20} color='#000' />
                    <Text style={styles.dateTimeTxt} >1h</Text>
                </View>
            </View>
            <View>
                <Text style={styles.subTitle}>Description</Text>
                <Text style={styles.descriptionTxt}>Venez faire des brasses tranquilles, sans prises de tête, pour un max de fun</Text>
                <Text style={styles.subTitle}>Participants 3/5</Text>
                <View style={styles.participants}>
                    {participantList}
                </View>

            </View>
            <TouchableOpacity style={styles.participateBtn} onPress={() => handleValidate()}>
                <Text style={styles.participateBtnTxt}>Participer</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingRight: 27.5,
        paddingLeft : 27.5,
        width: '100%',
        height: '100%',
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
        marginTop: 30,
        marginBottom: 10,
    },
    userIconContainer: {
        backgroundColor: '#121C6E',
        borderRadius: 50,
        width: 42,
        height: 42,
        padding: 8,
    },
    userIcon: {
        marginLeft: 4,
    },
    avatar: {
        borderRadius: 50,
        width: 35,
        height: 35,
        marginRight: 10,
    },
    emptyAvatar: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 50,
        width: 35,
        height: 35,
        marginRight: 10,
    },
    photoAddressLevelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sportName: {
        color: '#fff', 
        fontSize: 22,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        marginTop: -58, 
    }, 
    sportPhoto: {
        width: 180,
        height: 100,
        borderRadius:10,
    }, 
    activityCreator: {
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    creatorName: {
        fontSize: 14,
        marginRight: 10,
    },
    addressLevelContainer: {
        width : '100%',
        marginLeft: 10,
    }, 
    address: {
        width : 120,
        marginBottom: 5,
        fontSize: 14,
    },
    level: {
        backgroundColor: '#EA7810',
        color: 'white',
        borderRadius:20,
        textAlign: 'center',
        width : 100, 
        paddingTop: 5,
        paddingBottom : 5,

    },
    dateTimeContainer: {
        flexDirection: 'row',
        marginTop : 15,
        justifyContent: 'space-between',
    },
    dateTimeItem : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTimeTxt: {
        marginLeft: 10,
        fontSize: 14,
    },
    subTitle: {
        color: '#121C6E',
        marginTop : 15,
        marginBottom : 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    descriptionTxt: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        height: 100,
    },
    participants: {
        flexDirection: 'row',
    },
    participateBtn: {
        backgroundColor: '#121C6E',
        padding: 10,
        width: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop : 20,
    },
    participateBtnTxt: {
        color: 'white',
    },
});