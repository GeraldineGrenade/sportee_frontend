import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = (props) => {

const [currentPosition, setCurrentPosition] = useState({});
const [goodCoordinates, setGoodCoordinates] = useState(null);

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
