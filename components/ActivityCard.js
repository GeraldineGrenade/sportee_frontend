import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Activity = (props) => {
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <View
                style={
                    {
                        backgroundColor: 'black',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}>
                <Image style={styles.sportPhoto} source={require('../assets/sport-photos/yoga.jpg')} />
            </View>
            <Text style={styles.activityName}>{props.sport.name}</Text>

            <View style={styles.infosContainer}>

                <Text style={styles.activityTitle}>{props.titre}</Text>
                    <View style={styles.locInfos}>
                        <FontAwesome name='map-pin' size={15} color='#000' style={styles.mapIcon} />
                        <Text style={styles.city}>{props.city}</Text>
                    </View>
                <View style={styles.dateInfos}>
                    <FontAwesome5 name='calendar-alt' size={15} color='#000' style={styles.mapIcon} />
                     <Text style={styles.date}>{props.date}</Text> 
                </View>
                <View style={styles.nbrContainer}>
                        <FontAwesome name='user' size={15} color='#000' style={styles.calendarIcon} />
                        <Text style={styles.nbrParticipants}>Participants 2/5</Text> 
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