import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal, FlatList } from 'react-native'
import { Entypo } from 'react-native-vector-icons';
import { Fontisto } from 'react-native-vector-icons';
import RangeSlider, { Slider } from 'react-native-range-slider-expo'
import { useDispatch, useSelector } from 'react-redux';
import { addSport, removeSport, selectLevel } from '../reducers/preferences'
import ModaleSports from './ModaleSports';
import SelectionSport from './SelectionSport';
import SelectionTxt from './SelectionTxt';
// import DateTimePicker from '@react-native-community/datetimepicker'
import DropDownPicker from 'react-native-dropdown-picker'
import { updateSliderValue } from '../reducers/preferences';

const levelTitles = [
    'Sportif du dimanche',
    'Débutant',
    'Inter médiaire',
    'Expert'
]

const ModalFilter = ({ modalVisible, setModalVisible }) => {
    let dispatch = useDispatch();
    const selectedLevel = useSelector((state) => state.preferences.value.level)
    const [sportModalVisible, setSportModalVisible] = useState(false)
    const selectedSports = useSelector((state) => state.preferences.value.sports)
    const [sportIndex, setSportIndex] = useState(null)
    const [date, setDate] = useState(new Date())
    const [toValue, setToValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
        { label: 'Matin', value: 'Matin' },
        { label: 'Midi', value: 'Midi' },
        { label: 'Après-midi', value: 'Après-midi' },
        { label: 'Soir', value: 'Soir' },
        { label: 'Week-end', value: 'Week-end' },
    ])
    const [peopleValue, setPeopleValue] = useState(null)
    const [peopleOpen, setPeopleOpen] = useState(false)
    const [people, setPeople] = useState([
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
    ])
    const sliderValue = useSelector(state => state.preferences.value.sliderValue)
    const [searchValue, setSearchValue] = useState('')
    const [cityValue, setCityValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [cityModalVisible, setCityModalVisible] = useState(false)

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    `https://api-adresse.data.gouv.fr/search/?q=${searchValue}&autocomplete=1`
                )
                const data = await response.json()
                if (data.features) {
                    setSuggestions(data.features)
                } else {
                    console.log('Error in fetching cities')
                }
            } catch (error) {
                console.log('Error in fetching cities', error)
            }
        }

        if (searchValue) {
            fetchCities()
        } else {
            setSuggestions([])
        }
    }, [searchValue])

    const renderCityItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cityItem} onPress={() => {
                setSuggestions([])
                setSearchValue('')
                setCityValue(item.properties.city)
            }}>
                <Text style={styles.cityItemText}>
                    {item.properties.postcode}{item.properties.city}
                </Text>
            </TouchableOpacity>
        )
    }

    const closeCitySearch = () => {
        cityModalVisible(false)
        console.log(closeCitySearch)
    }

    const handleSliderChange = (value) => {
        dispatch(updateSliderValue(value))
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const selectSport = (data) => {
        setSportModalVisible(true);
        const { name, icon, index } = data;
        setSportIndex(index);
    }
    const closeSportModal = (sport) => {
        setSportModalVisible(false)
        sport.name === 'remove' ? dispatch(removeSport({ sport, sportIndex })) : dispatch(addSport({ sport, sportIndex }))
    }


    let sportList = selectedSports.map((e, i) => {
        {/* modify isSelected to implement */ }
        if (!e) {
            return <SelectionSport key={i} index={i} isSelected={false} name='add' icon='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684260544/sportee/addition-thick-symbol_b3edkd.png' selectSport={selectSport} />
        }
        return <SelectionSport key={i} index={i} isSelected={false} name={e.name} icon={e.icon} selectSport={selectSport} />
    })
    const selectTxt = (data) => {
        dispatch(selectLevel(data.title))
    }

    const levelList = levelTitles.map((e, i) => {
        //Verify if the level has been selected beforehand
        let isSelected = false
        if (selectedLevel === e) isSelected = true

        return <SelectionTxt key={i} isSelected={isSelected} selectTxt={selectTxt} title={e} />
    })

    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            style={styles.modalFilter}
        >
            <View style={styles.topModal}>
                <View style={styles.exit}>
                    <TouchableOpacity onPress={closeModal}>
                        <Entypo name='cross' size={40} color='#121C6E' style={styles.exitIcon} />
                    </TouchableOpacity>
                    <Text style={styles.filter}>Filtrer</Text>
                </View>
                <View style={styles.delete}>
                    <TouchableOpacity>
                        <Text>effacer les filtres</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.searchText}>Où cherches tu ?</Text>
            </View>
            <View style={styles.aroundMe}>
                <Fontisto name='map-marker-alt' size={25} color='#121C6E' />
                <Text style={styles.around}>Autour de moi</Text>
            </View>

            {/* INPUT FOR SEARCH CITY  */}
            <>
                <TextInput
                    placeholder='Rechercher une activité'
                    style={styles.searchBar}
                    value={searchValue}
                    onChangeText={value => {
                        setSearchValue(value)
                        setCityModalVisible(true)
                    }}
                />
                <View style={styles.citiesListContainer}>
                    <View style={styles.citiesList}>
                        <FlatList
                            data={suggestions}
                            keyExtractor={item => item.properties.id}
                            renderItem={renderCityItem}
                            onPress={() => { closeCitySearch }}
                        />
                        <Text>{cityValue}</Text>
                    </View>
                </View>

            </>

            {/* SLIDER FOR DEFINED CIRCLE OF RESEARCH */}
            <View style={styles.slider}>
                <Slider min={5} max={100} step={5}
                    valueOnChange={handleSliderChange}
                    initialValue={5}
                    knobColor='#EA7810'
                    valueLabelsBackgroundColor='#EA7810'
                    inRangeBarColor='#000000'
                    outOfRangeBarColor='#EA7810'
                    styleSize='small'
                />
            </View>
            <View>
                <Text style={styles.activity}>Quelles activités sportives cherches-tu ?</Text>
            </View>
            <View style={styles.selectSport}>
                <View style={styles.choices}>
                    {sportList}
                </View>
            </View>
            <Modal visible={sportModalVisible} animationType="fade" transparent>
                <ModaleSports closeModal={closeSportModal} sports={selectedSports} />
            </Modal>
            <View>
                <Text style={styles.level}>Ton niveau</Text>
            </View>
            <View style={styles.levelTxt}>
                {levelList}
            </View>
            <View>
                <Text style={styles.when}>Quand souhaites-tu faire ton activité ?</Text>
            </View>
            <View style={styles.activityDate}>
                {/* <DateTimePicker
                    style={styles.datePicker}
                    value={date}
                    mode="date"
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    minDate="01-01-2023"
                    maxDate="01-01-2100"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: -5,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            borderColor: "gray",
                            alignItems: "flex-start",
                            borderWidth: 0,
                            borderBottomWidth: 1,
                        },
                        placeholderText: {
                            fontSize: 17,
                            color: "gray"
                        },
                        dateText: {
                            fontSize: 17,
                        }
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                /> */}
                <DropDownPicker
                    style={styles.dropDown}
                    open={open}
                    value={toValue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setToValue}
                    setItems={setItems}
                    zIndex={10}

                    theme="LIGHT"
                    multiple={true}
                    mode="BADGE"
                    badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}

                />
            </View>
            <View>
                <Text style={styles.people}>Pour combien de personnes ?</Text>
            </View>
            <View style={styles.peopleContainer}>
                <DropDownPicker
                    style={styles.dropDownPeople}
                    open={peopleOpen}
                    value={peopleValue}
                    items={people}
                    setOpen={setPeopleOpen}
                    setValue={setPeopleValue}
                    setItems={setPeople}
                    theme="LIGHT"
                />
            </View>
            <TouchableOpacity style={styles.resultBtn}>
                <Text style={styles.bottomBtn}>Afficher les résultats</Text>
            </TouchableOpacity>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalFilter: {
        flex: 1,
    },
    topModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        alignItems: 'center',
        textAlign: 'center',
    },
    searchText: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15
    },
    aroundMe: {
        flexDirection: 'row',
        marginTop: 20,
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    around: {
        marginLeft: 15
    },

    searchBar: {
        width: '60%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 16,
        height: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        textAlign: 'center',
        marginLeft: '20%',
    },
    slider: {
        marginTop: '-5%',
        zIndex: 10,
    },
    activity: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '25%',
        textAlign: 'center'
    },
    selectSport: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '2%',
    },
    choices: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    level: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15
    },
    levelTxt: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '2%'
    },
    when: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    datePicker: {
        marginLeft: 25
    },
    dropDown: {
        width: '40%',
        marginLeft: 40,
        backgroundColor: '#ffffff',
        // zIndex: 9999,
    },
    activityDate: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 10
    },
    people: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15,
        marginTop: 20,
    },
    peopleContainer: {
        width: '100%',
        zIndex: 10
    },
    dropDownPeople: {
        marginLeft: 15,
        marginTop: 15,
        width: '40%'
    },
    bottomBtn: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    },
    resultBtn: {
        backgroundColor: '#121C6E',
        width: '80%',
        marginTop: 25,
        height: '5%',
        marginLeft: '10%',
        textAlign: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exit: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filter: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    delete: {
        marginRight: 15
    },
    modalFlatList: {
        height: '30%',
        width: '60%'
    },
    citiesListContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        top: '28%',
        width: '100%',
        zIndex: 20
    },
    cityItem: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cityItemText: {
        fontSize: 20,
        fontWeight: "600",
    }

})

export default ModalFilter;