import React from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'

//Data to send in props : name, id, icon, selectSport(), isSelected, index

export default SelectionSport = (props) => {

    // If the sport is already selected, it is not possible to select it again
    if (props.isSelected) {
        return (
            <View style={[styles.container, { backgroundColor: '#EA7810'}]}>
                <Image title={props.name} src={props.icon} style={styles.icon} />
                <Text style={styles.text}>{props.name}</Text>
            </View>
        )
    } 
        
    return (
            <TouchableOpacity style={[styles.container, { backgroundColor: 'white'}]} onPress={() => props.selectSport(props)}>
                <Image title={props.name} src={props.icon} style={styles.icon} />
                <Text style={styles.text}>{props.name}</Text>
            </TouchableOpacity>
        )
    }


const styles = StyleSheet.create({
    container: {
        borderColor: '#D9D9D9',
        borderRadius: 10,
        borderWidth: 1, 
        height:70,
        width:70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    }, 
   icon: {
    height:40,
    width:40,
   },
   text: {
    fontSize: 9,
    textAlign: 'center',
   },
});