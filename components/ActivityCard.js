import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Activity = (props) => {
    return (
        <View>
            <View style={styles.photoContainer}>
                <Image style={styles.sportPhoto}></Image>
                <Text style={styles.activityName}>Surf</Text>
            </View>

            <View style={styles.infosContainer}>

                <View style={styles.topInfos}>
                    <View style={styles.locInfos}>
                        <FontAwesome name='map-pin' size={15} color='#121C6E' style={styles.mapIcon} />
                        <Text style={styles.city}>Lille</Text>
                    </View>

                    <Text style={styles.nbrParticipants}>Participants 2/5</Text>
                </View>
                    <View style={styles.dateInfos}>
                        <FontAwesome name='calendar' size={15} color='#121C6E' style={styles.mapIcon} />
                        <Text style={styles.date}>11 juin 15h</Text> 
                    </View>
                <Text style={styles.activityTitle}>YOGA VINYASA A LA CITADELLE</Text> 

            </View>
            
        </View>
    )
}

export default Activity

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#f2f2f2',
    // //   alignItems: 'center',
    // },

    photoContainer: {

    }, 

    infosContainer: {

    }, 

    topInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 

    activityName: {
        color: '#fffaf0', 
    }, 

    sportPhoto: {

    }, 

    activityTitle: {
        fontSize: 11,
    }, 

    date: {
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 11,
    },

    nbrParticipants: {
        color: '#121C6E',
        fontWeight: '500',
        fontSize: 11,
    }, 

    city:{
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 11,
    }, 

    locInfos: {
        flexDirection: 'row',
        marginLeft: 1,
        // justifyContent: 'space-around',
    }, 

    dateInfos: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },


});