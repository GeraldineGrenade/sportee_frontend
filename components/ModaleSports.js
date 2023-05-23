import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import SelectionSport from './SelectionSport';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Info to send in props : closeModal(), sports

export default ModaleSports = (props) => {
    const [search, setSearch] = useState('');
    const [allSports, setAllSports] = useState([]);
    const selectedSports = useSelector((state) => state.preferences.value.sports);

    //Send selected sport data to parent component and close modal
    const selectSport = (sport) => {
        let newSport = { id: sport.id, name: sport.name, icon: sport.icon, photo: sport.photo }
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


    let sportsList = allSports.map((e, i) => {
        //Verify if the sport has been selected beforehand
        let isSelected = false
        for (let i = 0; i < selectedSports.length; i++) {
            if (selectedSports[i] !== null && selectedSports[i].name === e.name) isSelected = true
        }
        return <SelectionSport key={i} isSelected={isSelected} name={e.name} icon={e.icon} selectSport={selectSport} id={e._id} photo={e.photo} />
    })
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle} >Choisis ton sport</Text>
                <View style={styles.search}>
                    <FontAwesome name='search' style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchTxt}
                        inputMode='text'
                        placeholder="Rechercher un sport"
                        onChangeText={(value) => setSearch(value)}
                        value={search}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.sportsList}>
                    <SelectionSport isSelected={false} name='remove' icon='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405714/sportee/garbage_mtwpiy.png' selectSport={selectSport} />
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
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D9D9D9',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 35,
        fontSize: 12,
        marginBottom: 20,
    },
    searchIcon: {
        color: '#D9D9D9',
        marginRight: 5,
    },
    searchTxt: {
        fontSize: 18,
        color: '#ADABAB',
    },
    sportsList: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});