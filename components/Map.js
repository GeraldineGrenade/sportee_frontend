import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = (props) => {

const [currentPosition, setCurrentPosition] = useState({});
const [mapRegion, setMapRegion] = useState(null);

// const [modalVisible, setModalVisible] = useState(false);
// const [coordinates, setCoordinates] = useState(null);

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

    const onLongPress = (e) => {
        setCoordinates(e.nativeEvent.coordinate);
        setModalVisible(true);
    };

    const handleClosePopUp = () => {
        setModalVisible(false);
        setNewPlace('');
      };

    return (
        <View>
        <MapView
            style={styles.map}
            mapType= 'hybrid'>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
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

})



            {/* initialRegion={{
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
}} */}

// const [currentLatitude, setCurrentLatitude] = useState ({});
// const [currentLongitude, setCurrentLongitude] = useState ({})

