import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Button, StyleSheet, Modal } from 'react-native';
import ModaleSports from '../components/ModaleSports';
import SelectionTxt from '../components/SelectionTxt';
import SelectionSport from '../components/SelectionSport';
import { addSport, removeSport } from '../reducers/preferences';

import Feather from 'react-native-vector-icons/Feather';

const habitTitles = [
    'Le matin en semaine',
    'Le midi en semaine',
    'L\'après-midi en semaine',
    'Le soir en semaine',
    'Le weekend'
]

const levelTitles = [
    'Sportif du dimanche',
    'Débutant',
    'Inter médiaire',
    'Expert'
]

const SignUpPreferencesScreen = ({ navigation, route }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const selectedSports = useSelector((state) => state.preferences.value.sports);
    const [sportIndex, setSportIndex] = useState(null);
    const userInfo = route.params;
    let dispatch = useDispatch();

    const selectTxt = (txt) => {

    }

    const selectSport = (data) => {
        setIsModalVisible(true)
        const {name, icon, index} = data
        setSportIndex(index)
    }
    const closeModal = (sport) => {
        setIsModalVisible(false)
        dispatch(addSport({sport, sportIndex}))
    }


    const habitList = habitTitles.map((e, i) => {
        {/* modify isSelected to implement */ }
        return <SelectionTxt key={i} isSelected={false} selectTxt={selectTxt} title={e} />
    })
    const levelList = levelTitles.map((e, i) => {
        {/* modify isSelected to implement */ }
        return <SelectionTxt key={i} isSelected={false} selectTxt={selectTxt} title={e} />
    })

    let sportList = selectedSports.map((e, i) => {
        {/* modify isSelected to implement */ }
        if (!e) {
            return <SelectionSport key={i} index={i} isSelected={false} name='add' icon='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684260544/sportee/addition-thick-symbol_b3edkd.png' selectSport={selectSport} />
        }
        return <SelectionSport key={i} index={i} isSelected={false} name={e.name} icon={e.icon} selectSport={selectSport} />
    })

   
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpJoin')}>
                <Feather name='arrow-left' size={25} color='grey' />
            </TouchableOpacity>
            <Text style={styles.title}>Choisis tes préférences</Text>
            <Text style={styles.subTitle}>Mes activités sportives préférées</Text>
            <View style={styles.choices}>
                {sportList}
            </View>
            <Text style={styles.subTitle}>Je fais du sport ...</Text>
            <View style={styles.choices}>
                {habitList}
            </View>
            <Text style={styles.subTitle}>Je suis plûtot</Text>
            <View style={styles.choices}>
                {levelList}
            </View>
            <TouchableOpacity style={styles.validateBtn} onPress={() => handleValidate()}>
                <Text style={styles.validateBtnTxt}>Valider mes préférences</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="fade" transparent>
                <ModaleSports closeModal={closeModal} sports={selectedSports} />
            </Modal>
        </View>
    )
}

export default SignUpPreferencesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30,
        width: '100%',
        height: '100%',
    },
    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
        paddingBottom: 20,
    },
    subTitle: {
        color: '#121C6E',
        fontSize: 18,
        marginBottom: 8,
    },
    choices: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    validateBtn: {
        backgroundColor: '#121C6E',
        padding: 10,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    validateBtnTxt: {
        color: 'white',
    },

})