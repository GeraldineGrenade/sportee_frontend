import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAllActivities } from '../reducers/activities'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActivityCard from '../components/ActivityCard';
import Map from '../components/Map';
import ModalFilter from '../components/ModalFilter';
import ModaleConnect from '../components/ModaleConnect';
// import { addSport, removeSport, removeAllSports, addHabit, removeHabit, removeAllHabits, selectLevel, updateSliderValue } from '../reducers/preferences'

const HomeScreen = ({ navigation }) => {
    const [showMap, setShowMap] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [mapIconColor, setMapIconColor] = useState('#121C6E')
    const [mapTextColor, setMapTextColor] = useState('#121C6E')
    const [listIconColor, setListIconColor] = useState('#121C6E')
    const [listTextColor, setListTextColor] = useState('#121C6E')
    const connectedUser = useSelector((state) => state.user.value)
    const preferences = useSelector((state) => state.preferences.value)
    const activityData = useSelector((state) => state.activities.value)
    // const [filteredActivities, setFilteredActivities] = useState([])
    let dispatch = useDispatch()

    //On loading component, fetch all activities from DB and send then in activities store
    const { sports, level, sliderValue, selectedOption, selectedParticipants } = preferences
    let filteredActivities = activityData
    useEffect(() => {
        fetch('https://sportee-backend.vercel.app/activities')
            .then(response => {
                if (response.ok) {
                    console.log('route hit')
                    return response.json()
                } else {
                    throw new Error('Erreur lors de la récupération de l\'activité')
                }
            })
            .then(data => {
                dispatch(addAllActivities(data.activities))
                // setFilteredActivities(data.activities)
            })
            .catch(error => {
                console.error(error);
            })
    }, [])


    !sports.every(e => e === null) && (filteredActivities = filteredActivities.filter(activity => {

        return sports.some(e => e?.name === activity.sport?.name)
    }))

    selectedParticipants && (filteredActivities = filteredActivities.filter(activity => {
        return (activity.nbMaxParticipants >= selectedParticipants)
    }))

    level && (filteredActivities = filteredActivities.filter(activity => {
        return (activity.level === level)
    }))

    // Create algo to calculate the distance !!!!

    // sliderValue && (filteredActivities = filteredActivities.filter(activity => {
    //     return (activity.sliderValue <= sliderValue)
    // }))



    // Create algo to determine if a date is matin midi or soir !!!!

    // !selectedOption && (filteredActivities = filteredActivities.filter(activity => {
    //     return (activity.slotOption === selectedOption)
    // }))


    console.log(filteredActivities.map(e => e.sport))

    // console.log(preferences)


    const listContent = (
        <View>
            <Text style={styles.titlePopulate}>Activités populaires autour de moi</Text>
            <FlatList
                data={filteredActivities}
                renderItem={({ item }) => {
                    // console.log(item._id)
                    return <ActivityCard {...item} />
                }
                }
                keyExtractor={(item, i) => i}
                contentContainerStyle={styles.cardContainerTop}
                horizontal={true}
                vertical={false}
                showsHorizontalScrollIndicator={true}
            />

            <Text style={styles.titleForMe}>Activités liées à mes préférences</Text>
            <FlatList
                data={filteredActivities}
                renderItem={({ item }) => {
                    return <ActivityCard {...item} />
                }
                }
                keyExtractor={(item, i) => i}
                contentContainerStyle={styles.cardContainer}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
            />
        </View>
    )

    const handleNavigate = () => {
        navigation.navigate('ConnectionAll')
    }

    let content = listContent
    if (showMap) {
        content = (
            <View>
                {!connectedUser.email && <ModaleConnect handleNavigate={handleNavigate} />}

                <Map />

            </View>

        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topInfos}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesome5 name='sliders-h' size={25} color='#121C6E' style={styles.filterIcon} />
                </TouchableOpacity>
                <ModalFilter modalVisible={modalVisible} setModalVisible={setModalVisible} />
                <TextInput placeholder='Rechercher une activité' style={styles.input}></TextInput>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => { connectedUser.email ? navigation.navigate('Profil') : navigation.navigate('ConnectionAll') }} />
                </View>
            </View>

            <View style={styles.iconsNavigate}>
                <View style={styles.listIconContainer}>
                    <TouchableOpacity onPress={() => {
                        setShowMap(false)
                        setMapIconColor('#121C6E');
                        setMapTextColor('#121C6E');
                        setListIconColor('#EA7810');
                        setListTextColor('#EA7810');
                    }}>
                        <FontAwesome name='list-ul'
                            size={25}
                            color={listIconColor}
                            style={styles.listIcon} />
                        <Text style={[styles.texte, { color: listTextColor }]}>Liste</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mapIconContainer}>
                    <TouchableOpacity onPress={() => {
                        setShowMap(true);
                        setMapIconColor('#EA7810');
                        setMapTextColor('#EA7810');
                        setListIconColor('#121C6E');
                        setListTextColor('#121C6E');
                    }}>
                        <FontAwesome name='map'
                            size={25}
                            color={mapIconColor}
                            style={styles.mapIcon}
                        />
                        <Text style={[styles.texte, { color: mapTextColor }]}>Carte</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.principalContent}>
                {content}
            </View>
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
    },

    userIcon: {
        marginLeft: 4,
    },

    mapIcon: {
        marginBottom: 10,
        marginLeft: 5,
    },

    listIcon: {
        marginBottom: 10,
        marginLeft: 2.5,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },

    listIconContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },

    principalContent: {
        width: '100%',
    },

    titlePopulate: {
        fontSize: 18,
        fontWeight: '500',
        color: '#121C6E',
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 23,
    },

    titleForMe: {
        fontSize: 18,
        fontWeight: '500',
        color: '#121C6E',
        marginBottom: 5,
        marginTop: 35,
        marginLeft: 23,
    },

    cardContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '94%',
        flexGrow: 1,
        marginLeft: 12,
        marginRight: 10,
    },

    cardContainerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 12,
        marginRight: 10,
        paddingTop: 10, 
    },
});


// const listContent = (
//     <View>
//       <Text style={styles.titlePopulate}>Activités populaires autour de moi</Text>
//       <FlatList
//         data={filteredActivities}
//         renderItem={({ item }) => {
//           return (
//             <ActivityCard
//               // Pass the item data to the ActivityCard component
//               {...item}
//             />
//           );
//         }}
//         keyExtractor={(item, i) => i.toString()} // Convert the key to a string
//         contentContainerStyle={styles.cardContainerTop}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//       />
  
//       <Text style={styles.titleForMe}>Activités liées à mes préférences</Text>
//       <FlatList
//         data={filteredActivities}
//         renderItem={({ item }) => {
//           return (
//             <ActivityCard
//               // Pass the item data to the ActivityCard component
//               {...item}
//             />
//           );
//         }}
//         keyExtractor={(item, i) => i.toString()} // Convert the key to a string
//         contentContainerStyle={styles.cardContainer}
//         horizontal={false}
//         showsHorizontalScrollIndicator={false}
//         numColumns={2}
//       />
//     </View>
//   );

