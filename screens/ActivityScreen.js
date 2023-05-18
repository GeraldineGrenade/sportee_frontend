import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BACKEND_ADRESS = 'https://sportee-backend.vercel.app/'



const ActivityScreen = ({navigation}) => {


fetch(`${BACKEND_ADRESS}/activities`)
    .then(response => {
        if (response.ok) {
            response.json()
        }else {
            throw new Error('Erreur lors de la récupération de l\'activité')
        }
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error(error);
    })

    
    



    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Piscine à la cool</Text>
                <View style={styles.userIconContainer}>
                <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
                </View>         
            </View>
        </SafeAreaView>
    )
}

export default ActivityScreen

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
        }

});