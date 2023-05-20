import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { SignOut } from '../reducers/user'
import SelectionSport from '../components/SelectionSport';
import ModaleAvatars from '../components/ModaleAvatars';

//Info to send in props : closeModifyProfile()

export default ModifyProfile = (props) => {
    const connectedUser = useSelector((state) => state.user.value);
    const [avatar, setAvatar] = useState(connectedUser.avatar)
    const [showModalAvatar, setShowModalAvatar] = useState(false);
    let dispatch = useDispatch()

    //On closing avatar modal, set new avatar to chosen one
    const closeAvatarModal = (avatar) => {
        setShowModalAvatar(false)
        setAvatar(avatar)
    };

    let userSportList = connectedUser.preferences.sports.map((e, i) => {
        return (
            <View key={i} style={{marginRight: 10}}>
                <SelectionSport name={e.name} icon={e.icon} />
            </View>
        )
    });
    for (let i = 0; i < (4 - userSportList.length); i++) {
        userSportList.push(<SelectionSport />)
    };

    const handleValidate = () => {
        props.closeModifyProfile()
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Modifier mon profil</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} />
                </View>
            </View>

            <View style={styles.infosUser}>
                <View style={styles.avatarContainer}>
                    <Image title="avatar" src={avatar} style={styles.avatar} />
                    <TouchableOpacity onPress={() => setShowModalAvatar(true)}>
                        <FontAwesome5 name='pen' style={styles.modifyIAvatar} />
                    </TouchableOpacity>
                </View>
                <View style={styles.infosUserText}>
                    <Text style={styles.textName}>{connectedUser.firstname}</Text>
                    <Text style={styles.textAge}>x ans</Text>

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
                <Text style={styles.counter}>/280</Text>
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
            <TouchableOpacity style={styles.validateBtn} onPress={() => handleValidate()}>
                <Text style={styles.validateBtnTxt}>Valider les modifications</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    validateBtn: {
        backgroundColor: '#121C6E',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    validateBtnTxt: {
        color: 'white',
        fontSize: 16,
    },
})