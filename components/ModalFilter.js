import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal } from 'react-native'
import { Entypo } from 'react-native-vector-icons';
import { Fontisto } from 'react-native-vector-icons';
import RangeSlider, { Slider } from 'react-native-range-slider-expo'
import { useDispatch, useSelector } from 'react-redux';
import { addSport, removeSport } from '../reducers/preferences'
import ModaleSports from './ModaleSports';
import SelectionSport from './SelectionSport';
import SelectionTxt from './SelectionTxt';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker'

const ModalFilter = ({ modalVisible, setModalVisible }) => {
    let dispatch = useDispatch();
    const [sportModalVisible, setSportModalVisible] = useState(false);
    // const [fromValue, setFromValue] = useState(0);
    // const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0)
    const selectedSports = useSelector((state) => state.preferences.value.sports);
    const [sportIndex, setSportIndex] = useState(null);
    const [date, setDate] = useState('')
    const [toValue, setToValue] = useState(null)
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Matin', value: 'Matin' },
        { label: 'Midi', value: 'Midi' },
        { label: 'Après-midi', value: 'Après-midi' },
        { label: 'Soir', value: 'Soir' },
        { label: 'Week-end', value: 'Week-end' },
    ])



    const closeModal = () => {
        setModalVisible(false);
    }

    const selectSport = (data) => {
        setSportModalVisible(true)
        const { name, icon, index } = data
        setSportIndex(index)
    }
    const closeSportModal = (sport) => {
        setSportModalVisible(false)
        dispatch(addSport({ sport, sportIndex }))
    }

    let sportList = selectedSports.map((e, i) => {
        {/* modify isSelected to implement */ }
        if (!e) {
            return <SelectionSport key={i} index={i} isSelected={false} name='add' icon='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684260544/sportee/addition-thick-symbol_b3edkd.png' selectSport={selectSport} />
        }
        return <SelectionSport key={i} index={i} isSelected={false} name={e.name} icon={e.icon} selectSport={selectSport} />
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
                <TouchableOpacity onPress={closeModal}>
                    <Entypo name='cross' size={40} color='#121C6E' style={styles.exitIcon} />
                </TouchableOpacity>
                <Text>Filtrer</Text>
                <TouchableOpacity>
                    <Text>effacer les filtres</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.searchText}>Où cherches tu ?</Text>
            </View>
            <View style={styles.aroundMe}>
                <Fontisto name='map-marker-alt' size={25} color='#121C6E' />
                <Text style={styles.around}>Autour de moi</Text>
            </View>
            <TextInput placeholder='Rechercher une activité' style={styles.searchBar} />
            <View style={styles.slider}>
                <Slider min={5} max={100} step={5}
                    valueOnChange={value => setValue(value)}
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
                <SelectionTxt title='Sportif du dimanche' />
                <SelectionTxt title='Débutant' />
                <SelectionTxt title='Intermédiaire' />
                <SelectionTxt title='Expert' />
            </View>
            <View>
                <Text style={styles.when}>Quand souhaites-tu faire ton activité ?</Text>
            </View>
            <View style={styles.activityDate}>
                <DatePicker
                    style={styles.datePicker}
                    date={date}
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
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setToValue}
                    setItems={setItems}
                    style={styles.dropDown}
                />
            </View>
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
        height: '3%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        textAlign: 'center',
        marginLeft: '20%'
    },
    slider: {
        marginTop: '-5%',
        zIndex: 999,
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
        marginLeft: 40
    },
    activityDate: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        textAlign: 'center'
    }
})

export default ModalFilter