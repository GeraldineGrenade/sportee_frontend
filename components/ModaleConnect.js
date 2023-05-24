import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Info to send in props : handleNavigate(), handleBack() calledFrom

export default ModalConnect = (props) => {
    let mapStyle = {}
    return(
        <View style={[styles.container, mapStyle]}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Pour découvrir les activités à venir ...</Text>
                <TouchableOpacity style={styles.connectBtn} onPress={()=> props.handleNavigate()}>
                    <Text style={styles.connectBtnTxt}>Connecte toi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connectBtn} onPress={() => props.handleBack(props.calledFrom)}>
                    <Text style={styles.connectBtnTxt}>Retour</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '60%',
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
        height: 200,
        width: 220,
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