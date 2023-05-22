import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Activity ID to test : 6468e71e177bae8b6231ecf2

//{"_id": "6468e71e177bae8b6231ecf2", "date": "2023-06-12T17:32:30.351Z", "description": "Et ipsum dolor ad duis ipsum incididunt eu sunt nisi eiusmod.", "level": "Intermédiaires", "name": "Super cool activity", "nbMaxParticipants": 10, "participants": [{"_id": "6468e71e177bae8b6231ed05", "isApproved": true, "user": [Object]}, {"_id": "6468e71e177bae8b6231ed06", "isApproved": true, "user": [Object]}, {"_id": "6468e71e177bae8b6231ed07", "isApproved": true, "user": [Object]}], "place": {"_id": "6468e71e177bae8b6231ecf3", "address": "Saint-Étienne, Loire, France", "coords": {"latitude": 45.4401467, "longitude": 4.3873058}}, "sport": {"_id": "646395dd0efb12e60cbd26c5", "icon": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246192/sportee/wind-surf_cwz7ou.png", "name": "kite surf"}, "time": "2023-06-12T19:32:30.351Z", "user": {"__v": 0, "_id": "646792f6dea8baa635ef57f5", "avatar": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png", "badges": [], "dateOfBirth": "2023-05-19T15:12:15.769Z", "description": "", "email": "josephine.modiano@gmail.com", "firstname": "Joséphine", "lastname": "Modiano ", "password": "$2b$10$2eifF8Ln2xgobViP/vM4Ce3LOXyJP2XL4ABCKZcz3ZviSFYgvXnxe", "phone": "0625083889", "preferences": {"_id": "646792f6dea8baa635ef57f6", "habits": [Array], "level": "Inter médiaire", "sports": [Array]}, "token": "8ZYEXfLhPWqWos18KkFI8kW590muhvbN", "username": "Jojomodiano"}}

const ActivityScreen = ({ navigation, route }) => {
    const connectedUser = useSelector((state) => state.user.value);
    const [currentActivity, setCurrentActivity] = useState({});
    const [dayText, setDayText] = useState('');
    const [monthText, setMonthText] = useState('');
    const [duration, setDuration] = useState(null);
    const [isParticipationModalVisible, setIsParticipationModalVisible] = useState(false);
    const [isValidateParticipationModalVisible, setIsValidateParticipationModalVisible] = useState(false);
    const [buttonToRender, setButtonToRender] = useState(participateBtn)

    //Get activity info from id transmitted from previous page
    useEffect(() => {
        //!\Replace ID with route.params
        fetch('https://sportee-backend.vercel.app/activities/getActivity/646b1b763e5541193f69a690')
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setCurrentActivity(data.activity)

                    // setParticipantList(data.activity.participants.map((data, i) => {
                    //     return <Image key={i} title="participant-avatar" src={data.activity.user.avatar} style={styles.avatar} />
                    // }))
                    // //Push empty avatars for all remaining places in activity
                    // const remainingPlaces = data.activity.nbMaxParticipants - data.activity.participants.length
                    // for (let i = 0; i < remainingPlaces; i++) {
                    //     setParticipantList([...participantList, <View style={styles.emptyAvatar}></View>])
                    // }

                    //Calculate day of week and month of event date
                    let day = new Date(data.activity.date).getDay();
                    if (day === 0) setDayText('Lundi');
                    if (day === 1) setDayText('Mardi');
                    if (day === 2) setDayText('Mercredi');
                    if (day === 3) setDayText('Jeudi');
                    if (day === 4) setDayText('Vendredi');;
                    if (day === 5) setDayText('Samedi');
                    if (day === 6) setDayText('Dimanche')

                    let month = new Date(data.activity.date).getMonth();
                    if (month === 0) setMonthText('Janvier');
                    if (month === 1) setMonthText('Février');
                    if (month === 2) setMonthText('Mars');
                    if (month === 3) setMonthText('Avril');
                    if (month === 4) setMonthText('Mai');
                    if (month === 5) setMonthText('Juin');
                    if (month === 6) setMonthText('Juillet');
                    if (month === 7) setMonthText('Aout');
                    if (month === 8) setMonthText('Septembre');
                    if (month === 9) setMonthText('Octobre');
                    if (month === 10) setMonthText('Novembre');
                    if (month === 11) setMonthText('Décembre');

                    //!\Calculate duration of event - to adapt according to DB
                    // setDuration(new Date(data.activity.date).getTime() - new Date(data.activity.time).getTime())

                } else {
                    console.log('Error in fetching activity')
                }
            })
    }, [])

    let participantList = []
    for(let i=0; i <= currentActivity.nbMaxParticipants;i++) {
        if(!currentActivity.participants[i]) {
            participantList.push(<View key={i} style={styles.emptyAvatar}></View>)
        } else {
            participantList.push(<Image key={i} title="participant-avatar" src={currentActivity.participants[i].user.avatar} style={styles.avatar} />)
        }
    }

    //Modale confirmation de demande de participation
    const participationModal = (
        <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Souhaites-tu envoyer une demande de participation à l'organisateur de l'activité ?</Text>
                <TouchableOpacity style={styles.modalBtn} onPress={() => handleParticipate()}>
                    <Text style={styles.modalBtnTxt}>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setIsParticipationModalVisible(false)}>
                    <Text style={styles.modalBtnTxt}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const handleParticipate = () => {
        console.log('participate')
        setIsParticipationModalVisible(false)
        setIsValidateParticipationModalVisible(true)
    }

    //Modale confirmation de participation
    const validateParticipationModal = (
        <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Ta demande de participation a bien été envoyée à l'organisateur de l'activité !</Text>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setIsValidateParticipationModalVisible(false)}>
                    <Text style={styles.modalBtnTxt}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const handleModify = () => {
        console.log('modify')
    }

    const participateBtn = (
        <TouchableOpacity style={styles.participateBtn} onPress={() => setIsParticipationModalVisible(true)}>
            <Text style={styles.participateBtnTxt}>Participer</Text>
        </TouchableOpacity>
    )
    const completeEventBtn = (
        <View style={[styles.participateBtn, { backgroundColor: '#D9D9D9' }]}>
            <Text style={styles.participateBtnTxt}>Complet</Text>
        </View>
    )
    const validationInProgressBtn = (
        <View style={[styles.participateBtn, { backgroundColor: '#D9D9D9' }]}>
            <Text style={styles.participateBtnTxt}>Demande en cours</Text>
        </View>
    )
    const chatBtn = (
        //!\Add navigation to chat screen with id of activity in route.params
        <TouchableOpacity style={[styles.participateBtn, { backgroundColor: '#EA7810' }]} onPress={() => console.log('chat')}>
            <Text style={styles.participateBtnTxt}>Accéder au chat</Text>
        </TouchableOpacity>
    )
    const modifyBtn = (
        <TouchableOpacity style={styles.participateBtn} onPress={() => handleModify()}>
            <Text style={styles.participateBtnTxt}>Modifier</Text>
        </TouchableOpacity>
    )

    //Define which button appears
    if (connectedUser.name && connectedUser.email) {
        if (connectedUser._id === currentActivity.user._id) setButtonToRender(modifyBtn)
        if (currentActivity.participants.length === currentActivity.nbMaxParticipants) setButtonToRender(completeEventBtn)
        //!\Add logic to check if user is in participant list and is approved or not => chat and inProgress Btns 
        let isUser = currentActivity.participants.find(e => e.user._id === connectedUser._id)
    }

    return (
        <View style={styles.container}>
            {currentActivity.name &&
                <View>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>{currentActivity.name}</Text>
                        <View style={styles.userIconContainer}>
                            <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')} />
                        </View>
                    </View>
                    <View style={styles.activityCreator}>
                        <Text style={styles.creatorName}>Proposée par {currentActivity.user.firstname}</Text>
                        <Image title="avatar" src={currentActivity.user.avatar} style={styles.avatar} />

                    </View>
                    <View style={styles.photoAddressLevelContainer}>
                        <View >
                            <Image style={styles.sportPhoto} src={currentActivity.sport.photo} />
                            <Text style={styles.sportName}>{currentActivity.sport.name}</Text>
                        </View>
                        <View style={styles.addressLevelContainer}>
                            <TouchableOpacity>
                                <FontAwesome name='map-pin' size={15} color='#000' />
                                <Text style={styles.address}>{currentActivity.place.address}</Text>
                            </TouchableOpacity>
                            <View style={styles.level}>
                                <Text style={styles.levelTxt}>{currentActivity.level}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <View style={styles.dateTimeItem}>
                            <FontAwesome5 name='calendar-alt' size={25} color='#000' />
                            <Text style={styles.dateTimeTxt} >{dayText} {new Date(currentActivity.date).getDate()} {monthText} {new Date(currentActivity.date).getHours()}h</Text>
                        </View>
                        <View style={styles.dateTimeItem}>
                            <Ionicons name='timer-outline' size={25} color='#000' />
                            <Text style={styles.dateTimeTxt} >{currentActivity.time}h</Text>
                        </View>
                    </View>
                    {/* to remove after button tests */}
                    {buttonToRender}
                    <View style={styles.mainBody}>
                        <Text style={styles.subTitle}>Description</Text>
                        <Text style={styles.descriptionTxt}>{currentActivity.description}</Text>
                        <Text style={styles.subTitle}>Participants {currentActivity.participants.length}/{currentActivity.nbMaxParticipants}</Text>
                        <View style={styles.participants}>
                            {participantList}
                        </View>

                    </View>
                    {buttonToRender}
                </View>}
            {isParticipationModalVisible && participationModal}
            {isValidateParticipationModalVisible && validateParticipationModal}
        </View>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingRight: 27.5,
        paddingLeft: 27.5,
        paddingTop: 50,
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
        marginTop: 15,
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
        marginBottom: 10,
    },
    photoAddressLevelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
    sportName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        marginTop: -85,
    },
    sportPhoto: {
        width: 180,
        height: 140,
        borderRadius: 10,
    },
    activityCreator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    creatorName: {
        fontSize: 16,
        marginRight: 10,
    },
    addressLevelContainer: {
        width: '100%',
        marginLeft: 20,
    },
    address: {
        width: 120,
        marginBottom: 20,
        marginTop: 5,
        fontSize: 16,
    },
    level: {
        backgroundColor: '#EA7810',
        borderRadius: 20,
        textAlign: 'center',
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    levelTxt: {
        color: 'white',
        fontSize: 16,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    dateTimeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,

    },
    dateTimeTxt: {
        marginLeft: 10,
        fontSize: 16,
    },
    mainBody: {
        width: '100%',
        marginTop: 10,
    },
    subTitle: {
        color: '#121C6E',
        marginTop: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 18,
    },
    descriptionTxt: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        height: 150,
    },
    participants: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
    },
    participateBtn: {
        backgroundColor: '#121C6E',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 40,
    },
    participateBtnTxt: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        width: '80%',
        height: '90%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '18%',
        marginTop: '20%',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        color: '#121C6E',
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    modalBtn: {
        backgroundColor: '#121C6E',
        padding: 15,
        width: 200,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 15,
    },
    modalBtnTxt: {
        color: 'white',
        fontSize: 16,
    },
});