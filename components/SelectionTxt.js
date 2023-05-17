import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

//Data to send in props : title, selectTxt(), isSelected, category

export default SelectionTxt = (props) => {
    let color = ""
    props.isSelected ? color="#EA7810" : color="white"
   
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color}]} onPress={() =>props.selectTxt(props.category, props.title)}>
            <Text style={styles.text}>{props.title}</Text>
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
        padding : 10,
    }, 
   text: {
    fontSize: 10,
    textAlign: 'center',
   },
});