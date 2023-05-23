import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//{"__v": 0, "_id": "646b8b896fcac6675b6a961b", "conversation": {"_id": "646b8b896fcac6675b6a961d", "messages": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "users": ["64662968107a0fa2af912a63", "646792f6dea8baa635ef57f5", "64679415f1924a00483f370c", "646794e2dea8baa635ef581b"]}, "date": "2023-05-28T15:29:33.133Z", "description": "Occaecat proident magna reprehenderit et officia pariatur nisi tempor est velit elit sunt.", "handleClickActivityCard": [Function handleClickActivityCard], "level": "Débutant", "name": "Wonderful Event", "nbMaxParticipants": 10, "participants": [{"_id": "646b8b896fcac6675b6a9638", "isApproved": true, "user": "64662968107a0fa2af912a63"}, {"_id": "646b8b896fcac6675b6a9639", "isApproved": false, "user": "646792f6dea8baa635ef57f5"}, {"_id": "646b8b896fcac6675b6a963a", "isApproved": false, "user": "646794e2dea8baa635ef581b"}], "place": {"_id": "646b8b896fcac6675b6a961c", "address": "Nice, Maritime Alps, France", "coords": {"latitude": 43.7009358, "longitude": 7.2683912}}, "sport": {"_id": "646391fc0efb12e60cbd26ad", "icon": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246193/sportee/fencing_lm4fsz.png", "name": "escrime", "photo": "https://res.cloudinary.com/dube2vhtq/image/upload/v1684682688/escrime_akfh0l.jpg"}, "time": 3, "user": "64679415f1924a00483f370c"}

const Activity = (props) => {
    const [dateString, setDateString] = useState('')
    const [timeString, setTimeString] = useState('')
    const [city, setCity] = useState('')

    useEffect(() => {
        //Format date for render
        let date = new Date(props.date).getDate()
        if (date < 10) (date = '0' + date)

        let month = new Date(props.date).getMonth()
        let monthTxt = ''
        if (month === 0) monthTxt = 'Janvier';
        if (month === 1) monthTxt = 'Février';
        if (month === 2) monthTxt = 'Mars';
        if (month === 3) monthTxt = 'Avril';
        if (month === 4) monthTxt = 'Mai';
        if (month === 5) monthTxt = 'Juin';
        if (month === 6) monthTxt = 'Juillet';
        if (month === 7) monthTxt = 'Aout';
        if (month === 8) monthTxt = 'Septembre';
        if (month === 9) monthTxt = 'Octobre';
        if (month === 10) monthTxt = 'Novembre';
        if (month === 11) monthTxt = 'Décembre';

        setDateString(date + ' ' + monthTxt + ' ');

        //Format time for render
        let hours = new Date(props.date).getHours()
        if (hours < 10) (hours = '0' + hours)

        let minutes = new Date(props.date).getMinutes()
        if (minutes < 10) (minutes = '0' + minutes)
   
        setTimeString(hours+'h'+minutes)


    //Get city from address
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
                <Image style={styles.sportPhoto} src={props.sport.photo} />
            </View>
            <Text style={styles.activityName}>{props.sport.name}</Text>

            <View style={styles.infosContainer}>

                <Text style={styles.activityTitle}>{props.name}</Text>
                <View style={styles.locInfos}>
                    <FontAwesome name='map-pin' size={15} color='#000' style={styles.mapIcon} />
                    <Text style={styles.city}>{city}</Text>
                </View>
                <View style={styles.dateInfos}>
                    <FontAwesome5 name='calendar-alt' size={15} color='#000' style={styles.mapIcon} />
                    <Text style={styles.date}>{dateString} {timeString}</Text>
                </View>
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
    // container: {
    //   flex: 1,
    //   backgroundColor: '#f2f2f2',
    // //   alignItems: 'center',
    // },


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