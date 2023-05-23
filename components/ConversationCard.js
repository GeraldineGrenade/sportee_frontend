import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//Info to send in props : handleClickConversationCard()

export default ConversationCard = (props) => {
    const connectedUser = useSelector((state) => state.user.value);

    return (
        <TouchableOpacity style={styles.messageActiv} onPress={() => props.handleClickConversationCard(props._id)}>
            <View style={styles.creator}>
                <Image title="avatar" src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684405796/sportee/avatar1_suh7vc.png' style={styles.avatar} />
                <Text style={styles.creatorName}>Raphaël</Text>
            </View>
            <View style={styles.activityDetails}>
                <View style={[styles.detailContainer, {alignItems: 'center'}]}>
                    <Image title="sport" src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246194/sportee/tennis_qhk2wr.png' style={styles.sportIcon} />
                    <FontAwesome5 name='calendar-alt' size={22} color='#000' />
                </View>
                <View style={[styles.detailContainer, {marginTop: 15}]}>
                    <Text style={styles.descriptionTxt}>Tennis à la cool</Text>
                    <Text style={styles.descriptionTxt}>Samedi 10 Juin 15h</Text>
                </View>

            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
    },
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
        // color: '#121C6E',
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
