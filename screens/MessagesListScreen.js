import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ConversationCard from '../components/ConversationCard';

const MessagesListScreen = ({ navigation }) => {
    const connectedUser = useSelector((state) => state.user.value);
    const [myConversationList, setMyConversationList] = useState([]);
    const [otherConversationList, setOtherConversationList] = useState([])

    //Redirects to ConnectionScreen if no user connected
    useFocusEffect(() => {
        !connectedUser.email && navigation.navigate('ConnectionAll')
    })

    //On click on a conversation card, navigates to message Screen with id of activity in route.params
    const handleClickConversationCard = (activityId) => {
        navigation.navigate('Conversation', activityId)
    }

    useEffect(() => {
        //Gets list of activities in which the user is participating and is approved
        fetch(`http://10.1.0.84:3000/activities/getActivitiesOfUser?token=${connectedUser.token}`)
            .then(response => response.json())
            .then(data => {
                setOtherConversationList(data.activities)
            })
        //Gets list of activities created by user
        fetch(`http://10.1.0.84:3000/activities/getActivitiesByUser?token=${connectedUser.token}`)
            .then(response => response.json())
            .then(data => {
                setMyConversationList(data.activities)
            })
    }, [])

    const otherList = otherConversationList.map((e, i) => {
        return <ConversationCard key={i} {...e} handleClickConversationCard={handleClickConversationCard} />
    })
    const myList = myConversationList.map((e, i) => {
        return <ConversationCard key={i} {...e} handleClickConversationCard={handleClickConversationCard} />
    })
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Vos conversations</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => { connectedUser.token ? navigation.navigate('Profil') : navigation.navigate('ConnectionAll') }} />
                </View>
            </View>
            <View style={styles.input}>
                <FontAwesome name='search' style={styles.searchIcon} />
                <TextInput placeholder='Rechercher une conversation' style={styles.inputTxt}></TextInput>
            </View>

            {myConversationList &&
                <View style={styles.activeContainer}>
                    <Text style={styles.subtitle}>Conversations de mes activités : </Text>
                    <ScrollView contentContainerStyle={styles.messagesContainer}>
                        {myList}
                    </ScrollView>
                </View>
            }

            <View style={styles.archiveContainer}>
                <Text style={styles.subtitle}>Conversations des activités auxquelles je participe : </Text>

                {otherConversationList ?
                    (<ScrollView contentContainerStyle={styles.messagesContainer}>
                        {otherList}
                    </ScrollView>)
                    : <Text style={styles.noActivity}>Vous n'avez pas d'activités prévues pour l'instant</Text>
                }
            </View>
        </View>
    )
}

export default MessagesListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 27.5,
        marginLeft: 27.5,
        marginTop: 77,
        marginBottom: 10,
    },
    userIconContainer: {
        backgroundColor: '#121C6E',
        borderRadius: 50,
        width: 42,
        height: 42,
        padding: 8,
    },
    userIcon: {
        marginLeft: 4,
    },
    input: {
        width: '85%',
        height: 46,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 16,
        marginLeft: 30,
        marginRight: 15,
        paddingLeft: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    searchIcon: {
        color: '#D9D9D9',
        marginRight: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#121C6E',
        marginBottom: 20,
        marginLeft: 27.5,
    },
    activeContainer: {
        marginBottom: 30,
    },
    archiveContainer: {
        marginBottom: 40,
    },
    messageActiv: {
        borderColor: '#F2EEEE',
        backgroundColor: '#E4E0E0',
        borderRadius: 10,
        borderWidth: 1,
        height: 80,
        width: '80%',
        marginBottom: 10,
        marginTop: 10,
    },
    messagesContainer: {
        alignItems: 'center',
        height: 200,
    },
    messageArchiv: {
        borderColor: '#D9D9D9',
        borderRadius: 10,
        borderWidth: 1,
        height: 80,
        width: '80%',
        marginBottom: 10,
        marginTop: 10,
    },
    noActivity: {
        marginLeft: 27.5,
        fontStyle: 'italic',
        marginTop: 10,
        color: '#D9D9D9',
    },
});