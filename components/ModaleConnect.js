import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default ModalConnect = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Pour découvrir les activités à venir ...</Text>
                <TouchableOpacity style={styles.connectBtn} onPress={()=> navigation.navigate('ConnectionAll')}>
                    <Text style={styles.connectBtnTxt}>Connecte toi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '40%',
        width: '75%',
    },
    modalTitle: {
        color: '#121C6E',
        fontSize: 18,
        marginBottom: 8,
    },
    connectBtn: {
        backgroundColor: '#121C6E',
        padding: 10,
        width: 150,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 15,
    },
    connectBtnTxt: {
        color: 'white',
        fontSize: 16,
    },
});