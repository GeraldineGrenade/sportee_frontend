import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

//Data to send in props : name, id, icon, selectSport(), isSelected

export default SelectionSport = (props) => {
    let color = ""
    props.isSelected ? color="#EA7810" : color="white"
    


    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color}]} onPress={() => props.selectSport(props)}>
            <Image title={props.name} src={props.icon} style={styles.icon} />
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
    height:45,
    width:45,
   },
});