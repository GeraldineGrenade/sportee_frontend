import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image } from 'react-native'
import {Dimensions} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Map = (props) => {

const [currentPosition, setCurrentPosition] = useState({});
const [modalVisible, setModalVisible] = useState(false);
const [pinIconColor, setPinIconColor] = useState('#00bfff');
const [currentMarker, setCurrentMarker] = useState({});
const activityData = useSelector((state) => state.activities.value)
const preferences = useSelector((state) => state.preferences.value)

let dispatch = useDispatch()

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

     const handleOpenPopUp = (data) => {
         setCurrentMarker(data)
         setModalVisible(true);
         setPinIconColor('#ffa500')
     };

    const handleClosePopUp = () => {
        setModalVisible(false);
        setPinIconColor('#00bfff')
      };

      // {"__v": 0, "_id": "646b8b896fcac6675b6a961b", "conversation": {"_id": "646b8b896fcac6675b6a961d", "messages": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "users": ["64662968107a0fa2af912a63", "646792f6dea8baa635ef57f5", "64679415f1924a00483f370c", "646794e2dea8baa635ef581b"]}, "date": "2023-05-28T15:29:33.133Z", "description": "Occaecat proident magna reprehenderit et officia pariatur nisi tempor est velit elit sunt.", "handleClickActivityCard": [Function handleClickActivityCard], "level": "Débutant", "name": "Wonderful Event", "nbMaxParticipants": 10, "participants": [{"_id": "646b8b896fcac6675b6a9638", "isApproved": true, "user": "64662968107a0fa2af912a63"}, {"_id": "646b8b896fcac6675b6a9639", "isApproved": false, "user": "646792f6dea8baa635ef57f5"}, {"_id": "646b8b896fcac6675b6a963a", "isApproved": false, "user": "646794e2dea8baa635ef581b"}], "place": {"_id": "646b8b896fcac6675b6a961c", "address": "Nice, Maritime Alps, France", "coords": {"latitude": 43.7009358, "longitude": 7.2683912}}, "sport": {"_id": "646391fc0efb12e60cbd26ad", "icon": "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246193/sportee/fencing_lm4fsz.png", "name": "escrime", "photo": "https://res.cloudinary.com/dube2vhtq/image/upload/v1684682688/escrime_akfh0l.jpg"}, "time": 3, "user": "64679415f1924a00483f370c"}


     const allSportMarkers = activityData.map((data, i) => {
     return <Marker key={i} coordinate={{ latitude: data.place.coords.latitude, longitude: data.place.coords.longitude }} pinColor={pinIconColor} onPress={() => handleOpenPopUp({...data})}/>;
   });

    return (
       <View>
        <TouchableOpacity>
         <Modal visible={modalVisible} animationType="fade" transparent>
           <View style={styles.bottomView}>
           <View style={styles.modalView}>
               <View style={styles.photoContainer}>          
                 <Image style={styles.sportPhoto} source={require('../assets/sport-photos/surf.jpg')}/>
               </View>
           <View style={styles.infoButtonContainer}>
             <View style={styles.infosContainer}>
             <Text style={styles.activityTitle}>{currentMarker.name}</Text>
                 <View style={styles.locInfos}>
                   <FontAwesome name='map-pin' size={16} color='#121C6E' style={styles.mapIcon} />
                   <Text style={styles.city}>Lille</Text>
                 </View>
               <View style={styles.dateInfos}>
                         <FontAwesome5 name='calendar-alt' size={16} color='#121C6E' style={styles.calendarIcon} />
                         <Text style={styles.date}>{currentMarker.date}</Text> 
                     </View>
                 <View style={styles.nbrContainer}>
                         <FontAwesome name='user' size={16} color='#121C6E' style={styles.calendarIcon} />
                         <Text style={styles.nbrParticipants}>Participants 2/{currentMarker.nbMaxParticipants}</Text> 
                 </View>
             </View>
             <TouchableOpacity onPress={() => handleClosePopUp()} style={styles.button} activeOpacity={0.8}>
                 <Text style={styles.textButton}>x</Text>
             </TouchableOpacity>
         </View>
           </View>
         </View>
       </Modal>
     </TouchableOpacity>


        <MapView
            style={styles.map}
            mapType= 'hybrid'>
        {currentPosition && <Marker coordinate={currentPosition} pinColor={pinIconColor} onPress={() => handleOpenPopUp()}/>}
        {allSportMarkers}
        </MapView>
        </View>
    )
}


export default Map

const styles = StyleSheet.create({

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
      marginBottom: 100,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      flexDirection: 'row', 
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


    infoButtonContainer: {
    flexDirection: 'row',
    paddingRight: 10, 
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
  }, 

    sportPhoto: {
      width: 160,
      height: 100,
      borderTopLeftRadius:20,
      borderBottomLeftRadius:20,
  }, 

    activityTitle: {
      fontSize: 14,
      textTransform: 'uppercase',
      color: '#121C6E',
    }, 

    date: {
      fontWeight: '800',
      fontSize: 12,
      color: '#121C6E',
      paddingTop: 1,
  },

    city: {
      fontSize: 12,
      color: '#121C6E',
      paddingTop: 1,
    },

    nbrParticipants: {
      color: '#121C6E',
      fontWeight: '500',
      fontSize: 12,
      paddingTop: 1.5,
  },
  
  nbrContainer: {
    flexDirection: 'row',
  },

    locInfos: {
      flexDirection: 'row',
      marginBottom: 3,
  }, 

  mapIcon: {
    marginLeft: 2,
    marginRight: 6,
  },

    dateInfos: {
      flexDirection: 'row',
      marginBottom: 3,
  },

  calendarIcon: {
    marginRight: 4,
  }, 

    button: {
      width: 20,
      height: 20,
      alignItems: 'center',
      backgroundColor: 'grey',
      borderRadius: 30,
    },

    textButton: {
      color: '#ffffff',
      height: 20,
      fontWeight: '800',
      fontSize: 15,
    },

    infosContainer: {
      paddingRight: 15,
      paddingLeft: 10,
    }, 

})



// const [markers, setMarkers] = useState([]);

// useEffect(() => {
//     const markerData = props.markerData;
//     setMarkers(markerData);
//   }, [props.markerData]);

// const renderMarkers = () => {
//     return markers.map((marker, index) => (
//       <Marker
//         key={index}
//         coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
//         title={marker.name}
//       />
//     ));
//   };

// const markers = user.places.map((data, i) => {
//     return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
//   });

