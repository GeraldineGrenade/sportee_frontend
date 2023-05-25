import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

//Info to send in props : closeManageParticipationsModal(), activityId

export default ModaleManageParticipations = (props) => {
    const [participants, setParticipants] = useState([])

    //Get list of participants of activity
    useEffect(() => {
        fetch(`https://sportee-backend.vercel.app/activities/getParticipants/${props.activityId}`)
        .then(response => response.json())    
        .then(data => {
                setParticipants(data.participants)
            })
    }, [])

    //Accept the partcipation of a user
    const handleAcceptParticipation = (participantId) => {
        fetch(`https://sportee-backend.vercel.app/activities/acceptParticipation/${props.activityId}/${participantId}`, { method: 'PUT'})
        props.closeManageParticipationsModal()
    }

    //Refuse the partcipation of a user
    const handleRefuseParticipation = (participantId) => {
        fetch(`https://sportee-backend.vercel.app/activities/refuseParticipation/${props.activityId}/${participantId}`, { method: 'PUT'})
        props.closeManageParticipationsModal()
    }

    let participantList = []
    //Conditionnal rendering according to whether the user is approved or not
    if (participants) {
        participantList = participants.map((e, i) => {
            if (e.isApproved) {
                return (
                    <View key={i} style={styles.participantContainer}>
                        <View style={styles.participant}>
                            <Image title="avatar" src={e.user.avatar} style={styles.avatar} />
                            <Text style={styles.participantName}>{e.user.firstname}</Text>
                        </View>
                        <View style={styles.participationBtns}>
                            <Text style={styles.approvedTxt}>Participation validée</Text>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View key={i} style={styles.participantContainer}>
                        <View style={styles.participant}>
                            <Image title="avatar" src={e.user.avatar} style={styles.avatar} />
                            <Text style={styles.participantName}>{e.user.firstname}</Text>
                        </View>
                        <View style={styles.participationBtns}>
                            <TouchableOpacity style={styles.manageBtn} onPress={() => handleAcceptParticipation(e._id)}>
                                <Text style={styles.manageBtnTxt}>Accepter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.manageBtn} onPress={() => handleRefuseParticipation(e._id)}>
                                <Text style={styles.manageBtnTxt}>Refuser</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle} >Gestion des participants</Text>
                <ScrollView >
                    {participantList}
                </ScrollView>
                <TouchableOpacity style={styles.modalBtn} onPress={() => props.closeManageParticipationsModal()}>
                    <Text style={styles.modalBtnTxt}>Fermer</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '70%',
        width: '95%',
        marginTop: 80,
        marginLeft: 50,
    },
    modalTitle: {
        color: '#121C6E',
        fontSize: 18,
        marginBottom: 30,
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
    participantContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        width: '100%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,

    },
    participant: {
        alignItems: 'center',
        marginRight: 5,
    },
    participantName: {
        fontSize: 12,
        // color: '#121C6E',
        // fontWeight: 'bold',
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    participationBtns: {
        flexDirection: 'row',
    },
    approvedTxt: {
        fontStyle: 'italic',
        fontSize: 14,
        color: '#D9D9D9',
        marginLeft: 20,
    },
    manageBtn: {
        backgroundColor: '#EA7810',
        padding: 10,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 5,

    },
    manageBtnTxt: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
});