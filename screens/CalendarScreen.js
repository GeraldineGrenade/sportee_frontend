import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Calendar } from "react-native-calendars";
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';


const CalendarScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Mon calendrier d'activités</Text>
                <View style={styles.userIconContainer}>
                <FontAwesome name='user' size={25} color='#f8f8ff' style={styles.userIcon} onPress={() => navigation.navigate('Profil')}/>
                </View>         
            </View>

            {/* <View style={styles.agendaContainer}> */}
                <Agenda
                    // items={items}
                    // loadItemsForMonth={loadItems}
                    // selected={'2022-07-07'}
                    style={styles.calendar}
                    scrollEnabled={true}
                    // onScrollToTop={true}
                    refreshControl={null}
                    showClosingKnob={true}
                    refreshing={false}
                    // renderItem={renderItem}
                    theme={{
                        // calendarBackground: '#000000'
                        todayTextColor: '#00adf5',
                        // todayBackgroundColor: '#00adf5',
                    }}>
                </Agenda>
                <StatusBar />

            <TouchableOpacity style={styles.activity}>
                <Card style={styles.cardContainer}>
                <Card.Content>
                        <View style={styles.infosContainer}>
                            <Image style={styles.sportIcon} src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246191/sportee/gymnast_yowcyh.png'/>
                            <Text style={styles.activityTitle}>Yoga Vinyasa à la Citadelle</Text>
                            <Text style={styles.activityHour}>7h</Text>
                        </View>
                </Card.Content>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activity}>
                <Card style={styles.cardContainer}>
                <Card.Content>
                        <View style={styles.infosContainer}>
                            <Image style={styles.sportIcon} src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246193/sportee/boxing_bv0uo6.png'/>
                            <Text style={styles.activityTitle}>Boxe Thaïlandaise</Text>
                            <Text style={styles.activityHour}>12h</Text>
                        </View>
                </Card.Content>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activity}>
                <Card style={styles.cardContainer}>
                <Card.Content>
                        <View style={styles.infosContainer}>
                            <Image style={styles.sportIcon} src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246192/sportee/rugby-player_qruccp.png'/>
                            <Text style={styles.activityTitle}>Tournoi de Beach-Volley</Text>
                            <Text style={styles.activityHour}>15h</Text>
                        </View>
                </Card.Content>
                </Card>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.activity}>
                <Card style={styles.cardContainer}>
                <Card.Content>
                        <View style={styles.infosContainer}>
                            <Image style={styles.sportIcon} src='https://res.cloudinary.com/dsd7uux0v/image/upload/v1684246193/sportee/skate_labagf.png'/>
                            <Text style={styles.activityTitle}>Initiation au surf</Text>
                            <Text style={styles.activityHour}>18h</Text>
                        </View>
                </Card.Content>
                </Card>
            </TouchableOpacity>
            {/* </View> */}
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

    agendaContainer: {
    },

    calendar : {

    },

    infosContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    }, 

    cardContainer: {
    // marginTop: 10, 
    marginBottom: 10,
    justifyContent: 'center',
    marginLeft:20,
    marginRight:20,
    },

    activityTitle: {
    color: '#00bfff',
    fontWeight: '700',
    fontSize: 16,
    paddingTop: 5,
    },

    activityHour: {
        color: '#000', 
        fontWeight: '700',
        fontSize:18,
        paddingTop: 5,
    },

    sportIcon: {
    height:30,
    width:30,
    },

});

