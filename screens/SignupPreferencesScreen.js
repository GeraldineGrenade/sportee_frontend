import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import ModaleSports from '../components/ModaleSports';

import Feather from 'react-native-vector-icons/Feather';

const SignUpPreferencesScreen = ({ navigation, route }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSports, setSelectedSports] = useState([]);

    const userInfo = route.params
    //console.log(userInfo)

    const closeModal = (sports) => {
        setSelectedSports([...selectedSports, ...sports])
        setIsModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpJoin')}>
                <Feather name='arrow-left' size={25} color='grey' />
            </TouchableOpacity>
            <Text style={styles.title}>Choisis tes préférences</Text>
            <Button title='openModal' onPress={() => setIsModalVisible(true)}/>
            {isModalVisible && <ModaleSports closeModal={closeModal} sports={selectedSports}/>}
        </View>
    )
}

export default SignUpPreferencesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30,
        width: '100%',
        height: '100%',
      },
      title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
        paddingBottom: 20,
    },
})