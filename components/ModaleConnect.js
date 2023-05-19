import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default ModalConnect = ({ handleNavigate }) => {
    return(
        <View style={styles.container}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Pour découvrir les activités à venir ...</Text>
                <TouchableOpacity style={styles.connectBtn} onPress={()=> handleNavigate()}>
                    <Text style={styles.connectBtnTxt}>Connecte toi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        height: '70%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
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
        height: '25%',
        width: '55%',
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