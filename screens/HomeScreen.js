import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActivityCard from '../components/ActivityCard';


const HomeScreen = ({navigation}) => {

const [map, setMap] = useState(false);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topInfos}>
            <   FontAwesome name='align-center' size={25} color='#121C6E' style={styles.filterIcon} />
                <TextInput placeholder='Rechercher une activité' style={styles.input}></TextInput>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
                </View>              
            </View>

            <View style={styles.iconsNavigate}>
                <View style={styles.listIconContainer}>
                    <FontAwesome name='list-ul' size={25} color='#121C6E' style={styles.listIcon} />
                    <Text style={styles.texte}>Liste</Text>
                </View>
                <View style={styles.mapIconContainer}>
                    <FontAwesome name='map' size={25} color='#121C6E' style={styles.mapIcon} />
                    <Text style={styles.texte}>Carte</Text>
                </View>
            </View>

            <View style={styles.populate}>
                <Text style={styles.titlePopulate}>Activités populaires autour de moi</Text>
            </View>
            <View style={styles.forMe}>
                <Text style={styles.titleForMe}>Pour moi</Text>
                <View style={styles.cardContainer}>
                    <ActivityCard />
                </View>
            </View>
            {/* <Button onPress={navigation.navigate('SignUpJoin')} title="Sign Up"/>                     */}

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
    },

    topInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
    },

    input: {
        width: '60%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 16,
        marginLeft:15,
        marginRight:15,
        paddingLeft: 15,
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
    
    mapIcon: {
    marginBottom: 10,
    },

    listIcon: {
    marginBottom: 10,
    },

    // userIcon: {
    // padding: 10,
    // // backgroundColor: '#121C6E',
    // // borderRadius: 50, 
    // }, 

    filterIcon: {
        padding: 10,
    },

    iconsNavigate: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom:15,
        marginTop: 15,
    },

    texte: {
        color: '#121C6E',
        },

    mapIconContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft:5,
    },

    listIconContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight:5,
    },

   titlePopulate:{
    fontSize: 18,
    fontWeight: '500',
    color: '#121C6E',
    marginBottom:20,
    marginTop:30,
   }, 

   titleForMe:{
    fontSize: 18,
    fontWeight: '500',
    color: '#121C6E',
    marginBottom:20,
    marginTop:30,
   }, 

   forMe:{

   }, 

   populate: {

   },

   cardContainer: {

   }, 

});

