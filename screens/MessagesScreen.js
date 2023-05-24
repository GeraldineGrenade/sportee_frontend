import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat } from 'react-native-gifted-chat'
import Pusher from 'pusher-js/react-native'


const MessagesScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([])
    const connectedUser = useSelector((state) => state.user.value)
    const activityId = useSelector((state) => state.activity.id);

    useEffect(() => {
        fetch('https://sportee-backend.vercel.app/conversation/join-channel', {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => console.log('data', data))

        const pusher = new Pusher("11d41dded094302fda2e", {
            cluster: "eu",
            encrypted: true,
        })
        // const channelName = `activity-${activityId}`
        const channel = pusher.subscribe('sportee_channel')
        channel.bind('pusher:subscription_succeeded', () => {
            channel.bind('new-message', handleReceiveMessage)
        })
        //channel.bind('new-message', () => {
        // const newMessage = {
        //     _id: data.id,
        //     text: data.text,
        //     createdAt: new Date(data.createdAt),
        //     user: {
        //         _id: data.userId,
        //         name: data.userName,
        //         avatar: data.userAvatar,
        //     },
        // }
        //return 
        // fetch(`https://sportee-backend.vercel.app/conversation/getConversation/${id}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.result) {
        //             setMessages(previousMessages =>
        //                 GiftedChat.append(previousMessages, data.messages)
        //             )
        //         } else {
        //             console.log('conversation not found')
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // fetch get => giftedchat.append ....
        // setMessages((previousMessages) =>
        //     GiftedChat.append(previousMessages, [newMessage])
        // )
        // })

        return () => {
            pusher.unsubscribe('sportee_channel')
        }
    }, [])

    const handleReceiveMessage = () => {
        console.log('super message send')
        // fetch get messages ici
        fetch(`https://sportee-backend.vercel.app/conversation/getConversation/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setMessages(previousMessages =>
                        GiftedChat.append(previousMessages, data.messages)
                    )
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
        fetch(`https://sportee-backend.vercel.app/conversation/updateConversation/${activityId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
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

        // <SafeAreaView style={styles.container}>
        //     <View style={styles.topContainer}>
        //         <Text style={styles.title}>Tennis avec Rafael</Text>
        //         <View style={styles.userIconContainer}>
        //             <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => { connectedUser.token ? navigation.navigate('Profil') : navigation.navigate('ConnectionAll') }} />
        //         </View>
        //     </View>
        // </SafeAreaView>
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