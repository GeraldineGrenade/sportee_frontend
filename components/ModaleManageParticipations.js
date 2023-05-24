import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

//Info to send in props : closeManageParticipationsModal(), participants

let participants = [{"_id": "646b8b786fcac6675b6a9082", "isApproved": false, "user": {"__v": 0, "_id": "646792f6dea8baa635ef57f5", "avatar": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png", "badges": [Array], "dateOfBirth": "2023-05-19T15:12:15.769Z", "description": "", "email": "josephine.modiano@gmail.com", "firstname": "Joséphine", "lastname": "Modiano ", "password": "$2b$10$2eifF8Ln2xgobViP/vM4Ce3LOXyJP2XL4ABCKZcz3ZviSFYgvXnxe", "phone": "0625083889", "preferences": [Object], "token": "8ZYEXfLhPWqWos18KkFI8kW590muhvbN", "username": "Jojomodiano"}}, {"_id": "646b8b786fcac6675b6a9083", "isApproved": true, "user": {"__v": 0, "_id": "64679415f1924a00483f370c", "avatar": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png", "badges": [Array], "dateOfBirth": "2023-05-19T15:10:25.439Z", "description": "", "email": "dorianlelarge@gmail.co", "firstname": "Dorian", "lastname": "Lelarge", "password": "$2b$10$YlPiaNVnHhkBlEVRgDWWjOWB2aYMJ.H0iNDDAG/C0TZPJHgGK9wMO", "phone": "0635121422", "preferences": [Object], "token": "xF9d4ka5avejwkPNSPQBXFxIrZJrKECr", "username": "Doudoulamenace"}}, {"_id": "646b8b786fcac6675b6a9084", "isApproved": true, "user": {"__v": 0, "_id": "646794e2dea8baa635ef581b", "avatar": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png", "badges": [Array], "dateOfBirth": "2023-05-19T15:12:15.769Z", "description": "", "email": "camille.qui@gmail.com", "firstname": "Camille", "lastname": "Dauchy", "password": "$2b$10$3OsfsM6P21uXd6TT0XmdEel4EKev.vcPvi7CsQ21YlZQBMpqUzEw6", "phone": "", "preferences": [Object], "token": "uo82YtKktQaiBSyruu1oZT88YCleTa12", "username": "Camie"}}]

export default ModaleManageParticipations = (props) => {

    let participantList = participants.map((e, i) => {
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
                        <TouchableOpacity style={styles.manageBtn}>
                            <Text style={styles.manageBtnTxt}>Accepter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.manageBtn}>
                            <Text style={styles.manageBtnTxt}>Refuser</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    })

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
        marginTop: 70,
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
        marginBottom : 30,
        alignItems: 'center',
        width:'90%',
        justifyContent: 'space-between',
        borderColor: '#D9D9D9',
        borderWidth : 1,
        padding : 10,
        borderRadius: 5,

    },
    participant: {
        alignItems: 'center',
        marginRight: 10,
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
        // justifyContent: 'space-between',

    },
    approvedTxt: {
        fontStyle : 'italic',
        fontSize: 14,
        color: '#D9D9D9',
        marginRight : 15,
    },
    manageBtn: {
        backgroundColor: '#EA7810',
        padding: 10,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginLeft : 10,
    },
    manageBtnTxt: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
});