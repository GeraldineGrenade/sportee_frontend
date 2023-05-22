import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MessagesListScreen = ({navigation}) => {
    const connectedUser = useSelector((state) => state.user.value);

  //Redirects to ConnectionScreen if no user connected
  useFocusEffect(() => {
    !connectedUser.email && navigation.navigate('ConnectionAll')
  })
  

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Vos conversations</Text>
                {/* to remove after button tests */}
                <Button title="Activity" onPress={() => navigation.navigate('Activity')}/> 
                <View style={styles.userIconContainer}>
                <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
                </View>         
            </View>
            <View style={styles.inputContainer}>
            <TextInput placeholder='Rechercher une conversation' style={styles.input}></TextInput>
            </View>

            <View style={styles.activeContainer}>
                <Text style={styles.subtitleActive}>Conversations actives : </Text>
                <View style={styles.messagesActivContainer}>
                    <View style={styles.messageActiv}></View>
                    <View style={styles.messageActiv}></View>
                </View>
            </View>

            <View style={styles.archiveContainer}>
                <Text style={styles.subtitleArchive}>Anciennes conversations : </Text>
                
                <View style={styles.messagesArchivContainer}>
                    <View style={styles.messageArchiv}></View>
                </View>
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
    marginRight:27.5,
    marginLeft:27.5,
    marginTop: 30,
    marginBottom:10,
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
        width: '80%',
        height:46,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 16,
        marginLeft:15,
        marginRight:15,
        paddingLeft: 15,
        marginBottom: 20,
    },

    inputContainer: {
        marginTop: 30,
        alignItems: 'center'
    },

    subtitleActive: {
        fontSize: 16,
        fontWeight: '600',
        color: '#121C6E', 
        marginBottom: 20,
        marginLeft: 27.5,
        },
    
        subtitleArchive: {
        fontSize: 16, 
        fontWeight: '600',
        color: '#121C6E',
        marginBottom: 20,
        marginLeft: 27.5,
        },

        activeContainer: {
            marginTop:20,
            marginBottom: 40,
            // marginLeft: 27.5,
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
            height:80,
            width:'80%',
            marginBottom: 10, 
            marginTop: 10, 
        }, 

        messagesActivContainer: {
            alignItems: 'center'
        }, 


        messageArchiv: {
            borderColor: '#D9D9D9',
            borderRadius: 10,
            borderWidth: 1, 
            height:80,
            width:'80%',
            marginBottom: 10, 
            marginTop: 10, 
        }, 

        messagesArchivContainer: {
            alignItems: 'center'
        }, 
});