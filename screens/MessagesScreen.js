import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat } from 'react-native-gifted-chat'
import Pusher from 'pusher-js/react-native'


const MessagesScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([])
    const connectedUser = useSelector((state) => state.user.value)

    useEffect(() => {
        const pusher = new Pusher("11d41dded094302fda2e", {
            cluster: "81666e768eb7907f1a19",
            encrypted: true,
        })
        const channel = pusher.subscribe('channelName')

        channel.bind('message', (data) => {
            const newMessage = {
                _id: data.id,
                text: data.text,
                createdAt: new Date(data.createdAt),
                user: {
                    _id: data.userId,
                    name: data.userName,
                    avatar: data.userAvatar,
                },
            }
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, [newMessage])
            )
        })

        return () => {
            pusher.unsubscribe('channelName')
        }
    }, [])

    const onSend = (newMessages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        )
        const message = newMessages[0]
    }

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