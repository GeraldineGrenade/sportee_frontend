import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

//Info to send in props : closeAvatarModal()

export default ModaleAvatars = (props) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');

    //On click on avatar, close modal and send chosen avatar
    const handleChooseAvatar = (icon) => {
        props.closeAvatarModal(icon)
    }

    const avatarIcons = [
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar2_nmbj4l.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar3_jzjn5u.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar4_ug3mjt.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar5_ywvehs.png',
        'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar6_gvkxhz.png',
    ]

    let avatarList = avatarIcons.map((e, i) => {
        return (
            <TouchableOpacity key={i} onPress={() => handleChooseAvatar(e)}>
                <Image title="avatar" src={e} style={styles.avatar} />
            </TouchableOpacity>
        )
    })
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle} >Choisis ton avatar</Text>
                <ScrollView contentContainerStyle={styles.avatarList}>
                    {avatarList}
                </ScrollView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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