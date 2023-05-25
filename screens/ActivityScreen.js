import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ModaleManageParticipations from '../components/ModaleManageParticipations';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ActivityScreen = ({ navigation, route }) => {
    const connectedUser = useSelector((state) => state.user.value);
    const [currentActivity, setCurrentActivity] = useState({});
    const [dayText, setDayText] = useState('');
    const [monthText, setMonthText] = useState('');
    const [isParticipationModalVisible, setIsParticipationModalVisible] = useState(false);
    const [isValidateParticipationModalVisible, setIsValidateParticipationModalVisible] = useState(false);
    const [isManageParticipationsModalVisible, setIsManageParticipationsModalVisible] = useState(false);
    const [status, setStatus] = useState('participate');
    const [refreshPage, setRefreshPage] = useState(false)
    const activityId = route.params

    //Get activity info from id transmitted from previous page
    useEffect(() => {
       fetchData()
    }, [])

    const fetchData = () => {
        fetch(`https://sportee-backend.vercel.app/activities/getActivity/${activityId}`)
        .then(response => response.json())
        .then(data => {
            console.log('click')
            if (data.result) {
                setCurrentActivity(data.activity)

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

                //Define status of user relative to the activity
                if (connectedUser._id === data.activity.user._id) setStatus('creator')
                if (data.activity.participants.length === data.activity.nbMaxParticipants) setStatus('full')
                if (data.activity.participants.find(e => e.user._id === connectedUser._id && e.isApproved)) setStatus('approved')
                if (data.activity.participants.find(e => e.user._id === connectedUser._id && !e.isApproved)) setStatus('notApproved')

            } else {
                console.log('Error in fetching activity')
            }
        })
    }
    //Initialise participants lists according to participants and nbMaxParticipants
    let participantList = []
    let approvedStyle = {}
    for (let i = 0; i < currentActivity.nbMaxParticipants; i++) {
        if (!currentActivity.participants[i]) {
            participantList.push(<View key={i} style={styles.emptyAvatar}></View>)
        } else {
            if (!currentActivity.participants[i].isApproved) approvedStyle = { opacity: 0.2 }
            participantList.push(
                <Image key={i} title="participant-avatar" src={currentActivity.participants[i].user.avatar} style={[styles.avatar, approvedStyle]} />
            )
        }
    }

    //Modal to confirm that the user wants to request to participate
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

    //Send participation request of user to activity creator
    const handleParticipate = () => {
        fetch(`https://sportee-backend.vercel.app/activities/${activityId}/${connectedUser._id}`,
            {
                method: 'PUT',
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setIsParticipationModalVisible(false)
                    setIsValidateParticipationModalVisible(true)
                } else {
                    console.log('Error in sending participation request')
                    setIsParticipationModalVisible(false)
                }
            });
    }

    //Modal to confirm that participation request has been sent
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

    //Modify activity - Nice to have feature - to implement at a later stage
    const handleModify = () => {
        console.log('modify')
    }

    //Close Manage participations modal
    const closeManageParticipationsModal = () => {
        fetchData()
        setIsManageParticipationsModalVisible(false)
    }

    //Define button to render according to status of user
    let buttonToRender
    status === 'participate' && (buttonToRender = (
        <TouchableOpacity style={styles.participateBtn} onPress={() => setIsParticipationModalVisible(true)}>
            <Text style={styles.participateBtnTxt}>Participer</Text>
        </TouchableOpacity>
    ))
    status === 'full' && (buttonToRender = (
        <View style={[styles.participateBtn, { backgroundColor: '#D9D9D9' }]}>
            <Text style={styles.participateBtnTxt}>Complet</Text>
        </View>
    ))
    status === 'notApproved' && (buttonToRender = (
        <View style={[styles.participateBtn, { backgroundColor: '#D9D9D9' }]}>
            <Text style={styles.participateBtnTxt}>Demande en cours</Text>
        </View>
    ))
    status === 'approved' && (buttonToRender = (
        //On press, navigate to chat screen with id of activity in route.params
        <TouchableOpacity style={[styles.participateBtn, { backgroundColor: '#EA7810' }]} onPress={() =>         navigation.navigate('Conversation', activityId)}>
            <Text style={styles.participateBtnTxt}>Accéder au chat</Text>
        </TouchableOpacity>
    ))
    status === 'creator' && (buttonToRender = (
        <View style={styles.creatorBtns}>
            <TouchableOpacity style={[styles.participateBtn, { width: 175 }]} onPress={() => handleModify()}>
                <Text style={styles.participateBtnTxt}>Modifier l'activité</Text>
            </TouchableOpacity>
            {/* On press, navigate to chat screen with id of activity in route.params */}
            <TouchableOpacity style={[styles.participateBtn, { width: 175 }, {alignSelf: 'center'}]} onPress={() => navigation.navigate('Conversation', activityId)}>
                <Text style={styles.participateBtnTxt}>Accéder au chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.participateBtn, { width: '100%' }, {marginTop : 0}]} onPress={() => setIsManageParticipationsModalVisible(true)}>
                <Text style={styles.participateBtnTxt}>Gérer les participants</Text>
            </TouchableOpacity>

        </View>
    ))


    return (
        <View style={styles.container}>
            {currentActivity.name &&
                <View>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>{currentActivity.name}</Text>
                        <View style={styles.userIconContainer}>
                            <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => { connectedUser.token ? navigation.navigate('Profil') : navigation.navigate('ConnectionAll') }} />
                        </View>
                    </View>
                    <View style={styles.activityCreator}>
                        <Text style={styles.creatorName}>Proposée par {currentActivity.user.firstname}</Text>
                        <Image title="avatar" src={currentActivity.user.avatar} style={styles.avatar} />

                    </View>
                    <View style={styles.photoAddressLevelContainer}>
                        <View >
                            <View style={{ backgroundColor: 'black', borderRadius: 10 }}>
                                <Image style={styles.sportPhoto} src={currentActivity.sport.photo} />
                            </View>
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
            {isManageParticipationsModalVisible && <ModaleManageParticipations closeManageParticipationsModal={closeManageParticipationsModal} activityId={activityId} />}
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
        marginBottom: 5,
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
        opacity: 0.7, 

    },
    activityCreator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        marginTop: 20,
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
        marginTop: 15,
        marginBottom: 15,
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
        width: '100%',
        flexWrap: 'wrap',
    },
    participateBtn: {
        backgroundColor: '#121C6E',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 30,
    },
    participateBtnTxt: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
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
    creatorBtns: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});