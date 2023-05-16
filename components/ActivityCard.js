import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Activity = (props) => {
    return (
        <View style={styles.cardContainer}>
            {/* <View style={styles.photoContainer}> */}
                <Image style={styles.sportPhoto} source={require('../assets/sport-photos/yoga.jpg')}/>

                <Text style={styles.activityName}>Yoga</Text>

            {/* </View> */}

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


    cardContainer: {
    margin:10,    
    },

    photoContainer: {
        // width: '30%',
        // height: '25%',
      
    }, 

    infosContainer: {
        marginTop: 31,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
        borderColor: '#E4D8D8',
    }, 

    topInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        marginTop: 4,
        marginLeft: 4,
        marginRight: 4, 
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
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
   
        // zIndex: 1,
        // z-index: 1
    }, 

    activityTitle: {
        fontSize: 11,
        marginBottom: 4,
        marginTop: 4,
        marginLeft: 4,
        marginRight: 4, 
    }, 

    date: {
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 11,
        paddingTop: 2,
    },

    nbrParticipants: {
        color: '#121C6E',
        fontWeight: '500',
        fontSize: 11,
        paddingTop: 1,
    }, 

    city:{
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 11,
        paddingTop: 2,
    }, 

    locInfos: {
        flexDirection: 'row',
        marginLeft: 1,
        // justifyContent: 'space-around',
    }, 

    dateInfos: {
        flexDirection: 'row',
        marginLeft: 4,
        marginRight: 4, 
        // justifyContent: 'space-around',
    },


});