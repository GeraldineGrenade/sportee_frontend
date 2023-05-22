import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Platform,
  FlatList,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Fontisto } from 'react-native-vector-icons'
import SelectionSport from "../components/SelectionSport";
import { useSelector, useDispatch } from "react-redux";
import ModaleSports from "../components/ModaleSports";
import SelectionTxt from "../components/SelectionTxt";
import DateTimePicker from '@react-native-community/datetimepicker';

const BACKEND_ADRESS = "https://sportee-backend.vercel.app/";



const levelTitles = [
  "Sportif du dimanche",
  "Débutant",
  "Inter médiaire",
  "Expert",
];

const CreateScreen = ({ navigation }) => {
  //CREATE STATE SELECT SPORT
  const [newSport, setNewSport] = useState({
    name: "Choisis ton sport",
    icon: "https://res.cloudinary.com/dsd7uux0v/image/upload/v1684260544/sportee/addition-thick-symbol_b3edkd.png",
  });


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [isAvoiding, setIsAvoiding] = useState(false)


  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('')
  const [level, setLevel] = useState('');
  const [time, setTime] = useState('');
  const [nbMaxParticipants, setNbMaxParticipants] = useState('');
  const [conversation, setConversation] = useState('');
  const [user, setUser] = useState('');
  const [participants, setParticipants] = useState('');
  const [eventDate, setEventDate] = useState(new Date());


  const activityData = {
    name: name,
    sport: sport,
    description: description,
    place: place,
    level: level,
    time: time,
    nbMaxParticipants: nbMaxParticipants,
    conversation: conversation,
    user: user,
    particpants: participants,
  };


  const selectSport = () => {
    setIsModalVisible(true);
  };

  const selectTxt = (data) => {
    setLevel(data.title);
  };
  console.log(level);
  const closeModal = (sport) => {
    setIsModalVisible(false);
    setNewSport(sport);
  };
  //RETREVIAL OF THE ADDRESS OF THE PLACE OF THE ACTIVITY
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${searchValue}&autocomplete=1`
        );
        const data = await response.json();
        if (data.features) {
          setSuggestions(data.features);
        } else {
          console.log("Error in fetching cities");
        }
      } catch (error) {
        console.log("Error in fetching cities", error);
      }
    };

    if (searchValue) {
      fetchCities();
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const renderCityItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cityItem}
        onPress={() => {
          setSuggestions([]);
          setSearchValue("");
          setPlace(item.properties.label, item.properties.y, item.properties.x);
        }}
      >
        <Text style={styles.cityItemText}>
          {item.properties.label}

        </Text>
      </TouchableOpacity>
    );
  };
  const closeCitySearch = () => {
    cityModalVisible(false);
    console.log(closeCitySearch);
  };

  // VALIDATE CREATE ACTIVITY
  const handleCreate = () => {
    fetch(`${BACKEND_ADRESS}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erreur lors de la création de l'activité");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  // CHOICE THE LEVEL
  const levelList = levelTitles.map((e, i) => {
    //Verify if the level has been selected beforehand
    let isSelected = false;
    if (level === e) isSelected = true;

    return (
      <SelectionTxt
        key={i}
        category="level"
        isSelected={isSelected}
        selectTxt={selectTxt}
        title={e}
      />
    );
  });

  //CHOICE OF DATE AND TIME WITH DATETIMEPICKER



  // const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;




  // console.log(isAvoiding)
  return (
    <KeyboardAvoidingView
      style={isAvoiding ? { flex: 1, justifyContent: "flex-end" } : { flex: 1, justifyContent: "flex-start" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}

    >
      <View style={styles.topContainer}>
        <Text style={styles.title}>Créé ton activité</Text>
        <View style={styles.userIconContainer}>
          <FontAwesome
            name="user"
            size={25}
            color="#f8f8ff"
            style={styles.userIcon}
            onPress={() => navigation.navigate("Profil")}
          />
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.name}>
          <Text style={styles.titre}>Titre</Text>
          <TextInput
            placeholder="Nom de l'activité" value={name}
            style={styles.inputSport}
            onChangeText={value => {
              setName(value)
            }} />
        </View>
        <View style={styles.select}>
          <TouchableOpacity style={styles.selectSport}>
            <SelectionSport
              name={newSport.name}
              icon={newSport.icon}
              selectSport={selectSport}
            />
            <Modal visible={isModalVisible} animationType="fade" transparent>
              <ModaleSports closeModal={closeModal} />
            </Modal>
          </TouchableOpacity>
          <View style={styles.description}>
            <Text style={styles.textDescription}>
              Description de l'activité
            </Text>
            <TextInput
              placeholder="Description" value={description}
              style={styles.inputDescription}
              onChangeText={value => {
                setDescription(value)
              }}
            />
          </View>
        </View>
        <View style={styles.adress}>
          <Text style={styles.textAdress}>
            Adresse du point de rendez-vous
          </Text>
          <TextInput style={styles.inputAdress} placeholder='Localisation'
            value={searchValue}
            onChangeText={value => {
              setSearchValue(value)
              setCityModalVisible(true)
            }} />
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.properties.id}
            renderItem={renderCityItem}
            onPress={() => {
              closeCitySearch;
            }}
          />
        </View>
        <View style={styles.aroundMe}>
          <Fontisto style={styles.fontisto} name='map-marker-alt' size={16} color='#121C6E' />
          <Text style={styles.around} >{place}</Text>
          <Text >{place.label}</Text>
        </View>


        <View style={styles.level}>
          <Text style={styles.textLevel}>Cette activité s'adresse aux</Text>
          <View style={styles.btn}>{levelList}</View>
        </View>

        <View style={styles.date}>
          <Text style={styles.textDate}>
            Elle se tiendra le ... ... et durera environ
          </Text>
          <View style={styles.input}>
            <TouchableOpacity onPress={() => setOpen()}>
              <Text >Date/Heure</Text>
            </TouchableOpacity>
            <DateTimePicker

              value={eventDate}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate="01-01-2023"
              maxDate="01-01-2100"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                setEventDate(date)
              }}
            />



            <TextInput
              style={styles.inputHours}
              placeholder="Heures"
            // value={time}
            // onChangeText={value => {
            //   setTime(value) }}
            ></TextInput>
          </View>
        </View>

        <View style={styles.invitation}>
          <Text style={styles.textInvitation}>Je souhaite inviter</Text>

          <View style={styles.nbPersonne}>
            <TextInput
              style={styles.inputInvitation}
              placeholder="Nombre"
              keyboardType="numeric"
              onFocus={() => setIsAvoiding(true)}
              onBlur={() => setIsAvoiding(false)}
              value={nbMaxParticipants}
              onChangeText={value => {
                setNbMaxParticipants(value)
              }}

            />

            <Text style={styles.personne}>personnes</Text>
          </View>

        </View>

        <View style={styles.create}>
          <TouchableOpacity
            onPress={() => handleCreate()}
            style={styles.createBtn}
          >
            <Text style={styles.textBtn}>Créer mon activité</Text>
          </TouchableOpacity>
        </View>
      </View>

    </KeyboardAvoidingView>
  );

}


const styles = StyleSheet.create({
  title: {
    color: "#EA7810",
    fontSize: 24,
    fontWeight: "700",
    paddingTop: 8,
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 27.5,
    marginLeft: 27.5,
    marginTop: 30,
    marginBottom: 10,
  },

  userIconContainer: {
    backgroundColor: "#121C6E",
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

  main: {
    paddingRight: 15,
    paddingLeft: 15,
  },

  name: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 25,
    // marginLeft: 21,
  },

  titre: {
    fontSize: 15,
    marginTop: 10,
    // marginLeft: 5,
    paddingRight: 8,
    color: "#121C6E",
    fontWeight: 'bold',

  },

  inputSport: {
    width: 216,
    height: 44,
    backgroundColor: 'white',
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 15,
    marginLeft: 15,
    paddingLeft: 10,
  },

  selectSport: {
    // backgroundColor: "#f2f2f2",
    // borderRadius: 7,
    // borderWidth: 1,
    // borderColor: "#D9D9D9",
    // width: 71,
    // height: 71,
    // alignItems: "center",
    // paddingTop: 10,
    // // marginLeft: 8,
    marginTop: 27,
    // textAlign: "center",
  },

  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    // marginLeft: 18,
  },

  textSport: {
    alignItems: "center",
    textAlign: "center",
  },

  description: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 15,

  },

  textDescription: {
    fontSize: 15,
    paddingTop: 5,
    fontWeight: 'bold',
    color: "#121C6E",

  },

  inputDescription: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 250,
    height: 51,
    paddingLeft: 10,
    marginRight: 45,
  },

  adress: {
    FontSize: 15,
    marginTop: 25,
    // marginLeft: 30,
  },

  textAdress: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#121C6E",
  },

  inputAdress: {
    marginTop: 10,
    width: "100%",
    height: 45,
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingLeft: 10,
  },

  fontisto: {

  },

  aroundMe: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    textAlign: 'center',
    alignItems: 'center',
    // marginLeft: 5,
    // paddingLeft: 5,
  },

  around: {
    marginLeft: 20,
    //  marginTop: 10,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#EA7810'
  },

  level: {
    marginTop: 25,
  },

  textLevel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#121C6E",
  },

  btn: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btn1: {
    backgroundColor: "#f2f2f2",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 71,
    height: 71,
    alignItems: "center",
  },

  date: {
    marginTop: 25,
  },

  textDate: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#121C6E",
  },

  datePicker: {
    marginLeft: 25
  },

  input: {
    flexDirection: "row",
    justifyContent: 'space-between',

  },

  inputDate: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 145,
    height: 34,
    paddingLeft: 10,
    flexDirection: "row",
  },

  inputHours: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 145,
    height: 34,
    paddingLeft: 10,
  },

  invitation: {
    marginTop: 25,
    flexDirection: "column",
  },

  textInvitation: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#121C6E",
  },

  nbPersonne: {
    marginTop: 5,
    flexDirection: "row",
  },

  inputInvitation: {
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 137,
    height: 38,
    paddingLeft: 10,
  },

  personne: {
    fontSize: 15,
    paddingLeft: 5,
    marginTop: 10,
    fontWeight: 'bold',
    color: "#121C6E",

  },

  create: {
    height: 120,
    alignItems: "center",
    justifyContent: 'center'
  },

  createBtn: {
    backgroundColor: "#121C6E",
    borderRadius: 7,
    borderColor: "#121C6E",
    borderWidth: 1,
    width: 270,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },

  textBtn: {
    fontSize: 20,
    color: "#f2f2f2",
  },

  dropDown: {
    width: "10%",
  },


});



export default CreateScreen
