import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image } from 'react-native'
import {Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Map = (props) => {

const [currentPosition, setCurrentPosition] = useState({});
const [modalVisible, setModalVisible] = useState(false);
const [pinIconColor, setPinIconColor] = useState('#00bfff');


    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
       
          if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 10 },
              (location) => {
                setCurrentPosition(location.coords);
                // console.log(location);
              });
          }
        })();
       }, []);

     const handleOpenPopUp = () => {
         setModalVisible(true);
         setPinIconColor('#ffa500')
     };

    const handleClosePopUp = () => {
        setModalVisible(false);
        setPinIconColor('#00bfff')
      };

    // const markers = user.places.map((data, i) => {
    //   return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
    // });

    return (
      <View>
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.bottomView}>
          <View style={styles.modalView}>
            <View style={styles.photoButton}>
              <View style={styles.photoContainer}>          
                <Image style={styles.sportPhoto} source={require('../assets/sport-photos/surf.jpg')}/>
                <Text style={styles.activityName}>Surf</Text>
              </View>
              <TouchableOpacity onPress={() => handleClosePopUp()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infosContainer}>
              <View style={styles.topInfos}>
                <View style={styles.locInfos}>
                  <FontAwesome name='map-pin' size={16} color='#121C6E' style={styles.mapIcon} />
                  <Text style={styles.city}>28 rue du Général de Gaulle</Text>
                </View>
              </View>
              <View style={styles.dateInfos}>
                        <FontAwesome5 name='calendar-alt' size={16} color='#121C6E' style={styles.calendarIcon} />
                        <Text style={styles.date}>2 juin 12h</Text> 
                    </View>
                <Text style={styles.activityTitle}>Initiation au surf</Text>
                {/* <Text style={styles.nbrParticipants}>Participants 2/5</Text>  */}
            </View>
          </View>
        </View>
      </Modal>

        <MapView
            style={styles.map}
            mapType= 'hybrid'>
        {currentPosition && <Marker coordinate={currentPosition} pinColor={pinIconColor} onPress={() => handleOpenPopUp()}/>}
        </MapView>
        </View>
    )
}


export default Map

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#f2f2f2',
    // //   alignItems: 'center',
    // },

    map : {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, 
    alignItems: 'center',
    width: '100%', 
    marginRight: 20,
    },

    bottomView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 50,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      paddingLeft: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },


    photoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    }, 

    topInfos: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  }, 

    activityName: {
      color: '#fff', 
      fontSize: 25,
      fontWeight: '600',
      width: '100%',
      textAlign: 'center',
      marginTop: -65, 
  }, 

    sportPhoto: {
      width: 210,
      height: 115,
      borderRadius:10,
  }, 

    activityTitle: {
      fontSize: 13,
      textTransform: 'uppercase',
      color: '#121C6E',
  }, 

    date: {
      fontWeight: '600',
      fontSize: 12,
      color: '#121C6E',
  },

    city: {
      fontSize: 12,
      color: '#121C6E',
    },

    nbrParticipants: {
      color: '#121C6E',
      fontWeight: '500',
      fontSize: 13,
  }, 

    locInfos: {
      flexDirection: 'row',
      marginBottom: 3,
  }, 

    dateInfos: {
      flexDirection: 'row',
      marginBottom: 3,
  },

    button: {
      width: 20,
      height: 20,
      alignItems: 'center',
      // marginTop: 20,
      // paddingTop: 8,
      backgroundColor: 'grey',
      borderRadius: 30,
    },
    textButton: {
      color: '#ffffff',
      height: 25,
      fontWeight: '800',
      fontSize: 15,
      paddingTop: 1,
    },

    infosContainer: {
      marginTop: 50,
      paddingRight: 60,
    }, 

})


