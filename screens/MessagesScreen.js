import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat } from 'react-native-gifted-chat'
import Pusher from 'pusher-js/react-native'


const MessagesScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([])
    const [userId, setUserId] = useState('')
    const connectedUser = useSelector((state) => state.user.value)
    const activityId = route.params

    useEffect(() => {
        fetch(`http://sportee-backend.vercel.app/conversation/userId/${connectedUser.token}`)
            .then(response => response.json())
            .then(data => setUserId(data.userId))


        const pusher = new Pusher("11d41dded094302fda2e", {
            cluster: "eu",
            encrypted: true,
        })
        const channel = pusher.subscribe('sportee_channel')
        channel.bind('pusher:subscription_succeeded', () => {
            channel.bind('new-message', handleReceiveMessage)
        })

        handleReceiveMessage()
        return () => {
            pusher.unsubscribe('sportee_channel')
        }
    }, [activityId])

    const handleReceiveMessage = () => {
        fetch(`http://sportee-backend.vercel.app/conversation/getConversation/${activityId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.messages)
                if (data.result) {
                    console.log('My messages-------', data.messages.map(e => e.message))
                    data.messages.forEach(e => {
                        const { _id, message, user, timestamp } = e
                        setMessages(previousMessages => GiftedChat.append(previousMessages, { _id, text: message, user, createdAt: timestamp }))
                    })
                    // setMessages(previousMessages =>
                    //     GiftedChat.append(previousMessages, data.messages)
                    // )

                } else {
                    console.log('conversation not found')
                }
            })
            .catch(error => {
                console.log(error)
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

        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Channel name</Text>
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
    }

});