import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/fr'

//Info to send in props : handleClickConversationCard(), activityId, username, avatar, sporticon, date, time, name, conversation id 

export default ConversationCard = (props) => {
    moment.locale('fr')

    return (
        <TouchableOpacity style={styles.messageActiv} onPress={() => props.handleClickConversationCard(props.activityId)}>
            <View style={styles.creator}>
                <Image title="avatar" src={props.user.avatar} style={styles.avatar} />
                <Text style={styles.creatorName}>{props.user.username}</Text>
            </View>
            <View style={styles.activityDetails}>
                <View style={[styles.detailContainer, {alignItems: 'center'}]}>
                    <Image title={props.sport.name} src={props.sport.icon} style={styles.sportIcon} />
                    <FontAwesome5 name='calendar-alt' size={22} color='#000' />
                </View>
                <View style={[styles.detailContainer, {marginTop: 15}]}>
                    <Text style={styles.descriptionTxt}>{props.name}</Text>
                    <Text style={styles.descriptionTxt}>{moment(props.date).format('LLL')}</Text>
                </View>

            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
     messageActiv: {
        borderColor: '#F2EEEE',
        backgroundColor: '#E4E0E0',
        borderRadius: 10,
        borderWidth: 1, 
        height:115,
        width:'85%',
        marginBottom: 10, 
        marginTop: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    }, 
    creator: {
        alignItems: 'center',
        marginRight: 20,
    },
    avatar: {
        borderRadius: 50,
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    creatorName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    activityDetails: {
        flexDirection: 'row',
        width: 185,   
        alignItems: 'center',
        
    },
    detailContainer: {
        justifyContent: 'space-between',
        height: '70%',
        marginRight: 15,
    },
    sportIcon: {
        height: 30,
        width: 30,
    },
    descriptionTxt: {
        fontSize: 16,
    },
    
})
