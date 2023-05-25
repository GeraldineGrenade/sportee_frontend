import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat } from 'react-native-gifted-chat'
import Pusher from 'pusher-js/react-native'


const MessagesScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([])
    const [userId, setUserId] = useState('')
    const [activityName, setActivityName] = useState('')
    const connectedUser = useSelector((state) => state.user.value)
    const activityId = route.params

    useEffect(() => {
        fetch(`http://10.1.0.84:3000/conversation/userId/${connectedUser.token}`)
            .then(response => response.json())
            .then(data => setUserId(data.userId))

        const pusher = new Pusher("11d41dded094302fda2e", {
            cluster: "eu",
            encrypted: true,
        })
        const channel = pusher.subscribe('sportee_channel')
        channel.bind('new-message', handleReceiveMessage)

        !messages.length && fetch(`http://10.1.0.84:3000/conversation/getConversation/${activityId}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    data.messages.forEach(e => {
                        const { _id, message, user, timestamp } = e
                        setMessages(previousMessages => GiftedChat.append(previousMessages, { _id: _id, user: { _id: user, name: 'test' }, text: message, createdAt: timestamp }))
                    })
                    setActivityName(data.name)


                } else {
                    console.log('conversation not found')
                }
            })
        return () => {
            pusher.unsubscribe('sportee_channel')
        }
    }, [activityId])



    const handleReceiveMessage = () => {

        fetch(`http://10.1.0.84:3000/conversation/getLastMessage/${activityId}`)
            .then(response => response.json())
            .then(data => {

                console.log('My messages-------', data.message)
                const { _id, user, message, timestamp } = data.message
                console.log('id', _id)
                if (user !== userId && !message.some(e => e._id === _id)) {

                    setMessages(previousMessages => GiftedChat.append(previousMessages, { _id: _id, user: { _id: user }, text: message, createdAt: timestamp }))
                }
            })

    }

    const onSend = (newMessages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        )
        fetch(`http://sportee-backend.vercel.app/conversation/${activityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: newMessages[0].text, timestamp: new Date(), user: userId }),
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>{activityName}</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome
                        name="user"
                        size={25}
                        color="#f8f8ff"
                        style={styles.userIcon}
                        onPress={() => {
                            connectedUser.token
                                ? navigation.navigate('Profil')
                                : navigation.navigate('ConnectionAll')
                        }}
                    />
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: connectedUser.id,
                    name: connectedUser.name,
                    avatar: connectedUser.avatar,
                }}
            />
        </SafeAreaView>

    )
}

export default MessagesScreen

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
        marginTop: 30,
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

});