import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import ModaleSports from '../components/ModaleSports';
import SelectionTxt from '../components/SelectionTxt';
import SelectionSport from '../components/SelectionSport';
import { addSport, removeSport, addHabit, removeHabit, selectLevel, removeAllSports, removeAllHabits } from '../reducers/preferences';
import { signIn } from '../reducers/user';

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
    const [sportsError, setSportsError] = useState(false);
    const selectedHabits = useSelector((state) => state.preferences.value.habits);
    const [habitsError, setHabitsError] = useState(false);
    const selectedLevel = useSelector((state) => state.preferences.value.level);
    const [levelError, setLevelError] = useState(false);
    const [sportIndex, setSportIndex] = useState(null);
    let dispatch = useDispatch();

    //On selecting habit or level, dispatch selection to store
    const selectTxt = (data) => {
        if (data.category === 'habits') {
            selectedHabits.includes(data.title) ? dispatch(removeHabit(data.title)) : dispatch(addHabit(data.title))
        }
        if (data.category === 'level') dispatch(selectLevel(data.title))
    }

    //on selecting sport, open modal and get the index of the modified element in array of selectedSports
    const selectSport = (data) => {
        setIsModalVisible(true)
        setSportIndex(data.index)
    }

    //on closing the modal, dispatch the chosen sport to store along with the index of the modified element in array of selectedSports. If user choose to remove sport, remove sport from store
    const closeModal = (sport) => {
        setIsModalVisible(false)
        sport.name === 'remove' ? dispatch(removeSport({ sport, sportIndex })) : dispatch(addSport({ sport, sportIndex }))
    }

    const habitList = habitTitles.map((e, i) => {
        //Verify if the habit has been selected beforehand
        let isSelected = false
        if (selectedHabits.includes(e)) isSelected = true

        return <SelectionTxt key={i} category='habits' isSelected={isSelected} selectTxt={selectTxt} title={e} />
    })
    const levelList = levelTitles.map((e, i) => {
        //Verify if the level has been selected beforehand
        let isSelected = false
        if (selectedLevel === e) isSelected = true

        return <SelectionTxt key={i} category='level' isSelected={isSelected} selectTxt={selectTxt} title={e} />
    })

    let sportList = selectedSports.map((e, i) => {
        //If index of selectedSports in store is null, set default component to add icon
        if (!e) {
            return <SelectionSport key={i} index={i} isSelected={false} name='add' icon='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684260544/sportee/addition-thick-symbol_b3edkd.png' selectSport={selectSport} />
        }

        return <SelectionSport key={i} index={i} isSelected={false} name={e.name} icon={e.icon} selectSport={selectSport} />
    })


    //Validate user preferences
    const handleValidate = () => {
        //Check if the user has chosen all his preferences and if not add appropriate error text

        //Check sports
        const numUnselectedSports = selectedSports.reduce((acc, curr) => {
            curr === null && acc++
            return acc
        }, 0)
        if (numUnselectedSports > 3) {
            setSportsError(true)
            return
        } else {
            setSportsError(false)
        }

        //Check habits
        if (!selectedHabits.length) {
            setHabitsError(true)
            return
        } else {
            setHabitsError(false)
        }

        //Check level
        if (selectedLevel === '') {
            setLevelError(true)
            return
        } else {
            setLevelError(false)
        }

        //if all preferences are correct fetch signup route to create new user with personnal info and preferences
        //Get array of ids of selectedSports
        let selectedSportsIds = []
        selectedSports.forEach(e => {
            e !== null && selectedSportsIds.push(e.id)
        });

        const preferences = {
            level: selectedLevel,
            sports: selectedSportsIds,
            habits: selectedHabits,
        }
  
        fetch('https://sportee-backend.vercel.app/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({...route.params, preferences}),
		})
        .then(response => response.json())
			.then(data => {
				if (data) {
                    dispatch(signIn(data.user))  
                    //Reset preference store and navigate to tabNavigator
                    dispatch(removeAllSports())
                    dispatch(removeAllHabits())
                    dispatch(selectLevel(''))
                    navigation.navigate("TabNavigator")    
				}
			});

    }


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
            {sportsError && <Text style={styles.error}>Choisis au moins un sport préféré</Text>}

            <Text style={styles.subTitle}>Je fais du sport ...</Text>
            <View style={styles.choices}>
                {habitList}
            </View>
            {habitsError && <Text style={styles.error}>Choisis au moins une habitude de sport</Text>}

            <Text style={styles.subTitle}>Je suis plûtot</Text>
            <View style={styles.choices}>
                {levelList}
            </View>
            {levelError && <Text style={styles.error}>Choisis ton niveau</Text>}

            <TouchableOpacity style={styles.validateBtn} onPress={() => handleValidate()}>
                <Text style={styles.validateBtnTxt}>Valider mes préférences</Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible} animationType="fade" transparent>
                <ModaleSports closeModal={closeModal} />
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
        paddingBottom: 15,
    },
    subTitle: {
        color: '#121C6E',
        fontSize: 16,
        marginBottom: 8,
        marginTop: 5,

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
        marginTop: 15,
    },
    validateBtnTxt: {
        color: 'white',
    },
    error: {
        color: 'red',
        fontSize: 10,
        width: '100%',
        fontStyle: 'italic',
    },
})