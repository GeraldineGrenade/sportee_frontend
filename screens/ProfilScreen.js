import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const Tab = createBottomTabNavigator();

const ProfilScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon profil</Text>
                <View style={styles.userIconContainer}>
                <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
                </View>         
            </View>

            <View style={styles.infosUser}>
                <View style={styles.userPhotoContainer}>
                    <FontAwesome name='user' size={70} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
                </View>
                <View style={styles.infosUserText}>
                    <Text style={styles.textName}>Antoine</Text>
                    <Text style={styles.textAge}>30 ans</Text>
                    <Text style={styles.textCity}>Lille</Text>
                    <Text style={styles.nbrActivities}>Activités réalisées : 322</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.modifButton} activeOpacity={0.8}>
            <Text style={styles.textButton}>Modifier le profil</Text>
          </TouchableOpacity>
          <View style={styles.favoris}>
            <Text style={styles.subtitleFav}>Mes sports favoris</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.subtitleDesc}>Ma description</Text>
          </View>

          <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.deconnexionButton} activeOpacity={0.8}>
            <Text style={styles.textDeconnectButton}>Se deconnecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.legalInfosButton} activeOpacity={0.8}>
            <Text style={styles.textLegalButton}>infos légales</Text>
          </TouchableOpacity>
          </View>

        </SafeAreaView>
    )
}

export default ProfilScreen



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
    backgroundColor: '#EA7810',
    borderRadius: 50,
    width: 42,
    height: 42,
    padding: 8,
    // marginRight: 20,
    },

    infosUser: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
    },

    infosUserText: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        color: '#000000',
        fontSize: 14,
    },

    userPhotoContainer: {
        backgroundColor: '#A4ABB0',
        borderRadius: 50,
        width: 105,
        height: 105,
        padding: 25,
        // marginRight: 20,
        },

    userIcon: {
        // padding: 10,
        marginLeft: 4,
        },

    textButton: {
        color: '#f8f8ff',
        fontSize: 14,
        padding: 6.5,
        paddingLeft: 9,
    },

    textDeconnectButton: {
        color: '#000000',
        fontSize: 14,
        padding: 6.5,
        paddingLeft: 9,
    },

    textLegalButton: {
        color: '#000000',
        fontSize: 14,
        padding: 6.5,
        paddingLeft: 9,
    },

    modifButton: {
        backgroundColor: '#121C6E',
        borderRadius: 5, 
        width:'30%',
        height:30,
        marginTop: 20,
        marginLeft: 33,
    },

    legalInfosButton: {

    },

    deconnexionButton: {
        borderColor: '#121C6E',
        borderWidth: 1,
        borderRadius: 5, 
        width:'30%',
        height:30,
        marginTop: 20,
        marginLeft: 33,
    },

    favoris: {
        fontSize: 16,
        color: '#EA7810', 
        marginTop:20,
        marginBottom: 20,
        marginLeft: 20,
    },

    description: {
        marginTop:20,
        marginBottom: 20,
        marginLeft: 20,
    },

    subtitleDesc: {
    fontSize: 16,
    fontWeight: '550',
    color: '#EA7810', 
    },

    subtitleFav: {
    fontSize: 16, 
    fontWeight: '550',
    color: '#EA7810',
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});