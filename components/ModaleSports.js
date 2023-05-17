import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native'

import SelectionSport from './SelectionSport'

export default ModaleSports = (props) => {
    console.log('props from parent---', props.sports)
    const [search, setSearch] = useState('');
    const [selectedSports, setSelectedSports] = useState([]);
    const [sportsList, setSportsList] = useState([])

    const selectSport = (sport) => {
        let newSport = {id : sport.id, name: sport.name, icon : sport.icon}
        //selectedSports.length<5 && 
        setSelectedSports([...selectedSports, newSport])
        console.log('sport selected in modale---',selectedSports)
        props.closeModal(selectedSports)
        setSearch('')
    }
    useEffect(()=>{
        //Set previously selected sports on opening modal
        setSelectedSports(props.sports)
    }, [])

    useEffect(()=>{
        //Get list of sports from API which adapts to the user's search
        fetch(`https://sportee-backend.vercel.app/sports/${search}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    let sportsData = data.sports.map((e, i) => {
                        //Verify if the sport has been selected beforehand
                        let isSelected = selectedSports.some(sport => sport.name === e.name)
                        return <SelectionSport key={i} isSelected={isSelected} name={e.name} icon={e.icon} selectSport={selectSport} id={e._id} />
                    })
                    setSportsList(sportsData)
                } else {
                    console.log('Error in fetching sports')
                }
            })
    }, [search])

    return (
        <View style={styles.modalView}>
            <Text style={styles.modalTitle} >Choisis ton sport</Text>
            <TextInput
                style={styles.search}
                // Change image in input bar
                inlineImageLeft='search_icon'
                inlineImagePadding={10}
                inputMode='text'
                autoCapitalize="none"
                placeholder="Rechercher un sport"
                onChangeText={(value) => setSearch(value)}
                value={search}
            />
            <ScrollView contentContainerStyle={styles.sportsList}>
                {sportsList}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#D9D9D9',
        borderRadius: 10,
        borderWidth: 1,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
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
        height: '80%',
        width: '95%',
    },
    modalTitle: {
        color: '#121C6E',
        fontSize: 18,
        marginBottom: 8,
    },
    search: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        fontSize: 12,
        marginBottom: 20,
    },
    sportsList: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});