import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';

const today = moment().format('YYYY-MM-DD');

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
    ],
    monthNamesShort: [
        'Janv.',
        'Févr.',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juil.',
        'Août',
        'Sept.',
        'Oct.',
        'Nov.',
        'Déc.',
    ],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';



const CalendarScreen = ({ navigation }) => {
    const connectedUser = useSelector((state) => state.user.value);
    const [activities, setActivities] = useState({});

    const loadItems = (day) => {
            fetch(`https://sportee-backend.vercel.app/activities/getActivitiesOfUser?token=${connectedUser.token}`)
            .then(response => response.json())
            .then(data => {
                
                const newActivities = {}
                data.activities.forEach(activity => {
                    const formattedTime = moment(activity.date).format('YYYY-MM-DD')
                   
                    if (!newActivities[formattedTime]) {
                        newActivities[formattedTime] = [];
                    }
                    newActivities[formattedTime].push( {
                        name: activity.name, 
                        hour: moment(activity.date).format('hh:mm'),
                        src: activity.sport.icon,
                        id: activity.activityId
                    })
                })
                for (let i = 0; i < 85; i++) {
                    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                    const strTime = moment(time).format('YYYY-MM-DD');
    
                    if (!newActivities[strTime]) {
                        newActivities[strTime] = [];
                    }
                }
                setActivities(newActivities)
            });
 
    }

    //Redirects to ConnectionScreen if no user connected
useFocusEffect(() => {
    !connectedUser.email && navigation.navigate('ConnectionAll')
  })

    const handleClickActivityCardCalendar = (activityId) => {
        navigation.navigate('Activity', activityId)
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.activity} onPress={() => handleClickActivityCardCalendar(item.id)}>
                <Card style={styles.cardContainer}>
                    <Card.Content>
                        <View style={styles.infosContainer}>
                            <Image style={styles.sportIcon} src={item.src} />
                            <Text style={styles.activityTitle}>{item.name}</Text>
                            <Text style={styles.activityHour}>{item.hour}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon calendrier d'activités</Text>
                <View style={styles.userIconContainer}>
                    <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => { connectedUser.token ? navigation.navigate('Profil') : navigation.navigate('ConnectionAll') }} />
                </View>
            </View>
            <Agenda
                items={activities}
                loadItemsForMonth={loadItems}
                style={styles.calendar}
                scrollEnabled={true}
                selected={today}
                refreshControl={null}
                showClosingKnob={true}
                refreshing={false}
                renderItem={renderItem}
                theme={{
                    todayTextColor: '#ff7f50',
                    textDayFontWeight: '500',
                }}>
            </Agenda>
            <StatusBar />
        </View>
    )
}

export default CalendarScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },

    title: {
        color: '#EA7810',
        fontSize: 24,
        fontWeight: '700',
        paddingTop: 8,
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 27.5,
        marginLeft: 27.5,
        marginTop: 77,
        marginBottom: 10,
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

    infosContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },

    cardContainer: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },

    activity: {
        marginTop: 23,
    },

    activityTitle: {
        color: '#00bfff',
        fontWeight: '700',
        fontSize: 16,
        paddingTop: 7,
    },

    activityHour: {
        color: '#000',
        fontWeight: '700',
        fontSize: 18,
        paddingTop: 6,
    },

    sportIcon: {
        height: 30,
        width: 30,
    },

});
