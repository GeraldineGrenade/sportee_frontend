import React, { useState } from 'react';
<<<<<<< HEAD
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, FlatList, ScrollView } from 'react-native'
=======
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal } from 'react-native'
>>>>>>> a3132a8e266995f37af82dc78ed10ecde60a2e1e
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActivityCard from '../components/ActivityCard';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RangeSlider, { Slider } from 'react-native-range-slider-expo'

const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [map, setMap] = useState(false);
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0)

    const closeModal = () => {
        setModalVisible(false);
    }

// require('../assets/sport-photos/yoga.jpg')

const activityData = [{name:"Yoga", city: "Lille", date: "19 mai 18h", titre: "Yoga Vinyasa à la citadelle"}, {name:"Surf", city: "Wissant", date: "22 mai 11h", titre: "Initiation au surf", image:'../assets/sport-photos/surf.jpg'}, {name:"Boxe", city: "Lille", date: "25 mai 7h", titre: "Cours boxe thaïlandaise"}, {name:"Tennis", city: "Roubaix", date: "28 mai 12h", titre: "Tennis en exterieur"}, {name:"Beach-Volley", city: "Malo", date: "30 mai 12h", titre: "Tournoi de Beach-Volley"}, {name:"Football", city: "Roubaix", date: "2 juin 12h", titre: "Football with fun"}, {name:"Football", city: "Roubaix", date: "2 juin 12h", titre: "Football with fun"}, {name:"Football", city: "Roubaix", date: "2 juin 12h", titre: "Football with fun"}, {name:"Football", city: "Roubaix", date: "2 juin 12h", titre: "Football with fun"}, {name:"Football", city: "Roubaix", date: "2 juin 12h", titre: "Football with fun"}]


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topInfos}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesome name='align-center' size={25} color='#121C6E' style={styles.filterIcon} />
                </TouchableOpacity>
                <TextInput placeholder='Rechercher une activité' style={styles.input}></TextInput>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')} />
                </View>
            </View>
            <Modal
                animationType='fade'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                style={styles.modalFilter}
            >
                <View style={styles.topModal}>
                    <TouchableOpacity onPress={closeModal}>
                        <Entypo name='cross' size={40} color='#121C6E' style={styles.exitIcon} />
                    </TouchableOpacity>
                    <Text>Filtrer</Text>
                    <TouchableOpacity>
                        <Text>effacer les filtres</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.searchText}>Où cherches tu ?</Text>
                </View>
                <View style={styles.aroundMe}>
                    <Fontisto name='map-marker-alt' size={25} color='#121C6E' />
                    <Text style={styles.around}>Autour de moi</Text>
                </View>
                <TextInput placeholder='Rechercher une activité' style={styles.searchBar}>
                    {/* <FontAwesome placeholder='Rechercher une activité' name='search' size={25} color='#D9D9D9' /> */}
                </TextInput>
                <View style={styles.slider}>
                    <Slider min={5} max={100} step={5}
                        valueOnChange={value => setValue(value)}
                        initialValue={5}
                        knobColor='#EA7810'
                        valueLabelsBackgroundColor='#EA7810'
                        inRangeBarColor='#000000'
                        outOfRangeBarColor='#EA7810'
                        styleSize='small'
                    />
                </View>
                <View>
                    <Text style={styles.activity}>Quelles activités sportives cherches-tu ?</Text>
                </View>
            </Modal>
            <View style={styles.iconsNavigate}>
                <View style={styles.listIconContainer}>
                    <FontAwesome name='list-ul' size={25} color='#121C6E' style={styles.listIcon} />
                    <Text style={styles.texte}>Liste</Text>
                </View>
                <View style={styles.mapIconContainer}>
                    <FontAwesome name='map' size={25} color='#121C6E' style={styles.mapIcon} />
                    <Text style={styles.texte}>Carte</Text>
                </View>
            </View>
            <View style={styles.principalContent}>
                {/* <View style={styles.populate}> */}
                <Text style={styles.titlePopulate}>Activités populaires autour de moi</Text>
                 <FlatList
                        data={activityData}
                        renderItem={({item}) => {
                       return <ActivityCard {...item}/>
                        }
                    }
                        keyExtractor={(item, i) => i}
                        contentContainerStyle={styles.cardContainerTop}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                />
                
            {/* </View> */}
            {/* <View style={styles.forMe}> */}
                <Text style={styles.titleForMe}>Pour moi</Text>
                <FlatList
                        data={activityData}
                        renderItem={({item}) => {
                    
                       return <ActivityCard {...item}/>
                       
                        }
                    }
                        keyExtractor={(item, i) => i}
                        contentContainerStyle={styles.cardContainer}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        // ListFooterComponent={<View style={{height: 120}}/>}
                />
            {/* </View> */}
        </View>
                <View style={styles.cardContainerTop}>
                    <ActivityCard />
                    <ActivityCard />
                </View>
                {/* </View> */}
                {/* <View style={styles.forMe}> */}
                <Text style={styles.titleForMe}>Pour moi</Text>
                {/* <View style={styles.cardContainer}>
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                </View> */}
                {/* </View> */}
            {/* <Button onPress={navigation.navigate('SignUpPreferences')} title="Sign Up"/>                     */}

        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },

    topInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
    },

    input: {
        width: '60%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 15,
    },

    userIconContainer: {
        backgroundColor: '#121C6E',
        borderRadius: 50,
        width: 42,
        height: 42,
        padding: 8,
        // marginRight: 20,
    },

    userIcon: {
        // padding: 10,
        marginLeft: 4,
    },

    mapIcon: {
        marginBottom: 10,
    },

    listIcon: {
        marginBottom: 10,
    },

    filterIcon: {
        padding: 10,
    },

    iconsNavigate: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
    },

    texte: {
        color: '#121C6E',
    },

    mapIconContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
    },

    listIconContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 5,
    },

    principalContent: {
    alignItems:'flex-start',
    width: '100%',
    // height: '100%',
    marginLeft: 27.5,
    marginRight: 2, 
    },

   titlePopulate:{
    fontSize: 18,
    fontWeight: '500',
    color: '#121C6E',
    marginBottom:10,
    marginTop:30,
    marginLeft: 12,
   }, 

   titleForMe:{
    fontSize: 18,
    fontWeight: '500',
    color: '#121C6E',
    marginBottom:10,
    marginTop:20,
    marginLeft: 12,
   }, 
    //     alignItems: 'flex-start'
    //     width: '100%',
    //     marginLeft: 27.5,
    // },

    // titlePopulate: {
    //     fontSize: 18,
    //     fontWeight: '500',
    //     color: '#121C6E',
    //     marginBottom: 10,
    //     marginTop: 30,
    // },

    // titleForMe: {
    //     fontSize: 18,
    //     fontWeight: '500',
    //     color: '#121C6E',
    //     marginBottom: 10,
    //     marginTop: 20,
    // },

    // forMe: {

    // },

    // populate: {

    // },

    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '94%',
        flexWrap: 'wrap',
        // overflow: 'scroll',
    },

    cardContainerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'scroll',
    },
    modalFilter: {
        flex: 1
    },
    topModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        alignItems: 'center',
        textAlign: 'center',
    },
    searchText: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15
    },
    aroundMe: {
        flexDirection: 'row',
        marginTop: 20,
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    around: {
        marginLeft: 15
    },

    searchBar: {
        width: '60%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 16,
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        textAlign: 'center',
        marginLeft: '20%'
    },
    slider: {
        marginTop: '0%',
        zIndex: 999
    },
    activity: {
        color: '#121C6E',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '25%',
        textAlign: 'center'
    }

});

{/* <View style={{ height: `93%` }}>
  <FlatList
    contentContainerStyle={{ minHeight: `100%` }}
    scrollEnabled={true}
    ...props
    renderItem={({item}) => (
      <View style={{ flex: 1 }}>
        ...
      </View>
    )} */}