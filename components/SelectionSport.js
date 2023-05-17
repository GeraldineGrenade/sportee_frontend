import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

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
        height:60,
        width:60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    }, 
   icon: {
    height:40,
    width:40,
   },
});