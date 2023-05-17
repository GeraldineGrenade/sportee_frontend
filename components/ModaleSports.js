import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import SelectionSport from './SelectionSport'

//Info to send in props : closeModal(), sports

export default ModaleSports = (props) => {
    const [search, setSearch] = useState('');
    const [allSports, setAllSports] = useState([]);
    const selectedSports = useSelector((state) => state.preferences.value.sports);

    //Send selected sport data to parent component and close modal
    const selectSport = (sport) => {
        let newSport = { id: sport.id, name: sport.name, icon: sport.icon }
        props.closeModal(newSport)
        setSearch('')
    }
   
    useEffect(() => {
        //Get list of sports from API which adapts to the user's search /!\TO OPTIMISE, TOO LONG TO LOAD
        fetch(`https://sportee-backend.vercel.app/sports/${search}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setAllSports(data.sports)
                } else {
                    console.log('Error in fetching sports')
                }
            })
    }, [search])

    //!\Add a blanck component to remove sport 
    
     let sportsList = allSports.map((e, i) => {
        //Verify if the sport has been selected beforehand
        let isSelected = false
        for(let i=0; i<selectedSports.length; i++) {
            if (selectedSports[i] !== null && selectedSports[i].name === e.name) isSelected=true
        }
        return <SelectionSport key={i} isSelected={isSelected} name={e.name} icon={e.icon} selectSport={selectSport} id={e._id} />
    })
    return (
        <View style={styles.container}>
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
        width: '80%',
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