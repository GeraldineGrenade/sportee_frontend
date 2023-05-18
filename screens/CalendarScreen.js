import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// import { Calendar } from "react-native-calendars";
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

const CalendarScreen = ({navigation}) => {

const [activities, setActivities] = useState({});

const loadItems = async (day) => {
    setTimeout(() => {

        const newActivities = {
            [today]: [{
            src: 'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246191/sportee/gymnast_yowcyh.png', 
            name: 'Yoga Vinyasa',
            hour: '7h'
        }, 
         {
            src: 'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246193/sportee/boxing_bv0uo6.png', 
            name: 'Boxe Thaïlandaise',
            hour: '12h'
        }, 
    ],
        
        '2023-05-20': [{
                src: 'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246192/sportee/rugby-player_qruccp.png', 
                name: 'Tournoi de Beach-Volley',
                hour: '15h'
            }, 
    ],

    '2023-05-21': [
    {
        src: 'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246193/sportee/skate_labagf.png', 
        name: 'Initiation au surf',
        hour: '18h'
    },
],

    '2023-05-25': [
    {
        src: 'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246195/sportee/bicycle_ikt0vl.png', 
        name: 'Balade à vélo',
        hour: '17h30'
    },
],

    '2023-05-27': [
    {
        src: 'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246192/sportee/climbing_dzco9w.png', 
        name: 'Escalade en extérieur',
        hour: '14h30'
    },
],
        };
        // console.log(day)
    
        for (let i=0; i<85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = moment(time).format('YYYY-MM-DD'); 
            console.log(strTime)

            if (!newActivities[strTime]) {
                newActivities[strTime] = [];
            }
        }
        setActivities(newActivities)
    }, 100)
} 

const renderItem = (item) => {
    return (
        <TouchableOpacity style={styles.activity}>
        <Card style={styles.cardContainer}>
        <Card.Content>
                <View style={styles.infosContainer}>
                    <Image style={styles.sportIcon} src={item.src}/>
                    <Text style={styles.activityTitle}>{item.name}</Text>
                    <Text style={styles.activityHour}>{item.hour}</Text>
                </View>
        </Card.Content>
        </Card>
    </TouchableOpacity>
    )
}

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon calendrier d'activités</Text>
                <View style={styles.userIconContainer}>
                <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
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
                        // calendarBackground: '#000000'
                        todayTextColor: '#ff7f50',
                        textDayFontWeight : '500',
                    }}>
                </Agenda>
                <StatusBar />
        </SafeAreaView>
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
    marginRight:27.5,
    marginLeft:27.5,
    marginTop: 30,
    marginBottom:10,
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
    marginLeft:20,
    marginRight:20,
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
        fontSize:18,
        paddingTop: 6,
    },

    sportIcon: {
    height:30,
    width:30,
    },

});
