import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/fr'

const Activity = (props) => {
    const [city, setCity] = useState('')
    moment.locale('fr')

    useEffect(() => {
        //Get city from address
        let cityPattern = /[0-9]{5} /
        let resultArr = props.place.address.split(cityPattern)
        setCity(resultArr[resultArr.length - 1])
    }, [])


    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => props.handleClickActivityCard(props._id)}>
            <View
                style={
                    {
                        backgroundColor: 'black',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}>
                <Image style={styles.sportPhoto} src={props.sport?.photo} />
            </View>
            <Text style={styles.activityName}>{props.sport?.name}</Text>

            <View style={styles.infosContainer}>

                <Text style={styles.activityTitle}>{props.name}</Text>
                <View style={styles.locInfos}>
                    <FontAwesome name='map-pin' size={15} color='#000' style={styles.mapIcon} />
                    <Text style={styles.city}>{city}</Text>
                </View>
                {props.connected && <View style={styles.dateInfos}>
                    <FontAwesome5 name='calendar-alt' size={15} color='#000' style={styles.mapIcon} />
                    <Text style={styles.date}>{moment(props.date).format('LLL')}</Text>
                </View>}
                <View style={styles.nbrContainer}>
                    <FontAwesome name='user' size={15} color='#000' style={styles.calendarIcon} />
                    <Text style={styles.nbrParticipants}>Participants {props.participants.length}/{props.nbMaxParticipants}</Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}

export default Activity

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
    },

    infosContainer: {
        marginTop: 31,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
        borderColor: '#E4D8D8',
    },

    activityName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        marginTop: -58,
    },

    sportPhoto: {
        width: 180,
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        opacity: 0.7,
    },

    activityTitle: {
        fontSize: 11,
        marginTop: 6,
        marginLeft: 5,
        marginRight: 4,
        textTransform: 'uppercase',
    },

    date: {
        marginLeft: 6,
        fontWeight: '600',
        fontSize: 11,
        paddingTop: 1,
    },

    nbrParticipants: {
        color: '#000',
        fontWeight: '600',
        fontSize: 11,
        marginLeft: 8,
        paddingTop: 1,
    },

    city: {
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 11,
        paddingTop: 2,
    },

    nbrContainer: {
        flexDirection: 'row',
        marginLeft: 5,
        paddingTop: 3,
        marginBottom: 3,
    },

    locInfos: {
        flexDirection: 'row',
        marginLeft: 5,
        marginBottom: 4,
        marginTop: 3,
        marginRight: 4,
    },

    dateInfos: {
        flexDirection: 'row',
        marginLeft: 4,
        marginRight: 4,
    },


});