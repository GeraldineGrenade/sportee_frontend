import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ConversationCard from '../components/ConversationCard';

const MessagesListScreen = ({ navigation }) => {
    const connectedUser = useSelector((state) => state.user.value);
    const [myConversationList, setMyConversationList] = useState(null);
    const [otherConversationList, setOtherConversationList] = useState(null)


    //Redirects to ConnectionScreen if no user connected
    useFocusEffect(() => {
        !connectedUser.email && navigation.navigate('ConnectionAll')
    })


    const handleClickConversationCard = (activityId) => {
        navigation.navigate('Conversation', activityId)
    }


    useEffect(() => {
        //Gets list of activities in which the user is participating and is approved
        fetch(`https://sportee-backend.vercel.app/activities/getActivitiesOfUser?token=${connectedUser.token}`)
            .then(response => response.json())
            .then(data => {
                const Otherlist = data.activities.map((e, i) => {
                    return <ConversationCard key={i} {...e} handleClickConversationCard={handleClickConversationCard} />
                })
                setOtherConversationList(Otherlist)
            })
        //Gets list of activities created by user
        fetch(`https://sportee-backend.vercel.app/activities/getActivitiesByUser?token=${connectedUser.token}`)
            .then(response => response.json())
            .then(data => {
                const myList = data.activities.map((e, i) => {
                    return <ConversationCard key={i} {...e} handleClickConversationCard={handleClickConversationCard} />
                })
                setMyConversationList(myList)
            })
    }, [])


    return (
        <SafeAreaView style={styles.container}>
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

                    <ScrollView contentContainerStyle={styles.messagesActivContainer}>
                        {myConversationList}
                    </ScrollView>
                </View>
            }

            <View style={styles.archiveContainer}>
                <Text style={styles.subtitle}>Conversations des activités auxquelles je participe : </Text>

                {otherConversationList ?
                    (<ScrollView contentContainerStyle={styles.messagesArchivContainer}>
                        {otherConversationList}
                    </ScrollView>)
                    : <Text style={styles.noActivity}>Vous n'avez pas d'activités prévues pour l'instant</Text>
                }
            </View>

        </SafeAreaView>
    )
}

export default MessagesListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        //   alignItems: 'center',
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
        marginTop: 30,
        marginBottom: 10,
    },

    userIconContainer: {
        backgroundColor: '#121C6E',
        borderRadius: 50,
        width: 42,
        height: 42,
        padding: 8,
        // marginRight: 20,
    },

    userIcon: {
        // padding: 10,
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
        fontSize: 16,
        fontWeight: '600',
        color: '#121C6E',
        marginBottom: 20,
        marginLeft: 27.5,
    },

    activeContainer: {
        marginBottom: 30,
    },

    archiveContainer: {
        // marginTop:20,
        marginBottom: 40,
        // marginLeft: 27.5,
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

    messagesActivContainer: {
        alignItems: 'center',
        height: '35%',
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

    messagesArchivContainer: {
        alignItems: 'center',
        height: '30%',
    },
    noActivity: {
        marginLeft: 27.5,
        fontStyle: 'italic',
        marginTop: 10,
        color: '#D9D9D9',
    },
});