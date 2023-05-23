import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

//Info to send in props : closeManageParticipationsModal()

export default ModaleManageParticipations = (props) => {

    // let avatarList = avatarIcons.map((e, i) => {
    //     return (
    //         <TouchableOpacity key={i} onPress={() => handleChooseAvatar(e)}>
    //             <Image title="avatar" src={e} style={styles.avatar} />
    //         </TouchableOpacity>
    //     )
    // })

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle} >Gestion des participants</Text>
                <ScrollView contentContainerStyle={styles.avatarList}>
                    {/* {avatarList} */}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '55%',
        width: '80%',
    },
    modalTitle: {
        color: '#121C6E',
        fontSize: 18,
        marginBottom: 40,
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
    avatarList: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});