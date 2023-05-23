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
import { Fontisto } from "react-native-vector-icons";
import SelectionSport from "../components/SelectionSport";
import { useSelector, useDispatch } from "react-redux";
import ModaleSports from "../components/ModaleSports";
import SelectionTxt from "../components/SelectionTxt";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

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

  const userToken = useSelector((state) => state.user.value.token);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [isAvoiding, setIsAvoiding] = useState(false);

  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState({});
  const [level, setLevel] = useState("");
  // const [time, setTime] = useState("");
  const [nbMaxParticipants, setNbMaxParticipants] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [dateAndTime, setDateAndTime] = useState(new Date().toISOString());
  const [selectedValue, setSelectedValue] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownOptions = Array.from({ length: 12 }, (_, index) => index + 1);

  const selectSport = () => {
    setIsModalVisible(true);
  };

  const selectTxt = (data) => {
    setLevel(data.title);
  };

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
          // console.log(data.features[0].properties.label)
          console.log(data.features[0].geometry.co);
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
          setPlace({
            address: item.properties.label,
            coords: {
              latitude: item.geometry.coordinates[0],
              longitude: item.geometry.coordinates[1],
            },
          });
        }}
      >
        <Text style={styles.cityItemText}>{item.properties.label}</Text>
      </TouchableOpacity>
    );
  };

  const closeCitySearch = () => {
    cityModalVisible(false);
    console.log(closeCitySearch);
  };

  const activityData = {
    name,
    sport: newSport.id,
    description,
    place,
    level,
    date: new Date(dateAndTime),
    time: Number(selectedValue),
    nbMaxParticipants,
    userToken,
  };
  console.log(dateAndTime)
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
        navigation.navigate('ActivityScreen', { activityId: data.id });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // CHOOSE THE LEVEL
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

  //CHOOSE OF DATE AND TIME WITH DATETIMEPICKER

  

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
    setDateAndTime(
      new Date(
        [
          value.toISOString().split("T")[0],
          time.toISOString().split("T")[1],
        ].join("T")
      ).toISOString()
    );
  };

  const onTimeSelected = (event, value) => {
    const formattedValue = new Date(value.getTime() + 2 * 60 * 60 * 1000);
    setTime(formattedValue);
    setTimePicker(false);
    setDateAndTime(
      new Date(
        [
          date.toISOString().split("T")[0],
          value.toISOString().split("T")[1],
        ].join("T")
      ).toISOString()
    );

  };
  const formattedDateTime = moment(dateAndTime).format('LLL')

  // console.log(dateAndTime);

  // DROPDOWNPICKER
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    setDropdownVisible(false);
  };

  const resetSelectedValue = () => {
    setSelectedValue(null);
  };
  // const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  // console.log(isAvoiding)
  return (
    <KeyboardAvoidingView
      style={
        isAvoiding
          ? { flex: 1, justifyContent: "flex-end" }
          : { flex: 1, justifyContent: "flex-start" }
      }
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
            placeholder="Nom de l'activité"
            value={name}
            style={styles.inputSport}
            onChangeText={(value) => {
              setName(value);
            }}
          />
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
              placeholder="Description"
              value={description}
              style={styles.inputDescription}
              onChangeText={(value) => {
                setDescription(value);
              }}
            />
          </View>
        </View>
        <View style={styles.adress}>
          <Text style={styles.textAdress}>Adresse du point de rendez-vous</Text>
          <TextInput
            style={styles.inputAdress}
            placeholder="Localisation"
            value={searchValue}
            onChangeText={(value) => {
              setSearchValue(value);
              setCityModalVisible(true);
            }}
          />
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
          <Fontisto
            style={styles.fontisto}
            name="map-marker-alt"
            size={16}
            color="#121C6E"
          />
          <Text style={styles.around}>{place.address}</Text>
        </View>

        <View style={styles.level}>
          <Text style={styles.textLevel}>Cette activité s'adresse aux</Text>
          <View
            style={styles.btn}
            onChangeText={(value) => {
              setLevel(value);
            }}
            value={level}
          >
            {levelList}
          </View>
        </View>

        <View style={styles.date}>
          <Text style={styles.textDate}>
            Elle se tiendra le ... ... et durera environ
          </Text>
          <View style={styles.input}>
            <View style={styles.datePicker}>
              <View style={styles.inputDate}>
                {datePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDateSelected}
                  />
                )}
                {!datePicker && (
                  <View>
                    <TouchableOpacity onPress={() => setDatePicker(true)}>
                      <Text>Date</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.timePicker}>
                  {timePicker && (
                    <DateTimePicker
                      value={time}
                      mode="time"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={onTimeSelected}
                    />
                  )}
                  {!timePicker && (
                    <View>
                      <TouchableOpacity onPress={() => setTimePicker(true)}>
                        <Text>Heure</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              {/* <View style={styles.dateAndTime} > */}
              <Text style={styles.dateAndTime}>{formattedDateTime}</Text>
              {/* </View> */}
            </View>
            <View style={styles.inputHours}>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.dropdownToggle}
              >
                <Text style={styles.dropdownToggleText}>
                {selectedValue !== null ? `${selectedValue}H` : "Durée de l'activité"}
                 
                </Text>
                
              </TouchableOpacity>
              <Modal visible={dropdownVisible} animationType="fade" transparent>
                <TouchableOpacity
                  style={styles.dropdownBackdrop}
                  onPress={toggleDropdown}
                >
                  <View style={styles.dropdown}>
                    {dropdownOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleOptionSelect(option)}
                        style={styles.dropdownOption}
                      >
                        <Text>{option}H</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>

              <TouchableOpacity onPress={resetSelectedValue}>
      <Text style={styles.reinitialisation} >Réinitialiser</Text>
    </TouchableOpacity>
            </View>
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
              onChangeText={(value) => {
                setNbMaxParticipants(value);
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
};

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
    fontWeight: "bold",
  },

  inputSport: {
    width: 216,
    height: 44,
    backgroundColor: "white",
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
    fontWeight: "bold",
    color: "#121C6E",
  },

  inputDescription: {
    marginTop: 10,
    backgroundColor: "white",
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
    fontWeight: "bold",
    color: "#121C6E",
  },

  inputAdress: {
    marginTop: 10,
    width: "100%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingLeft: 10,
  },

  fontisto: {},

  aroundMe: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
    textAlign: "center",
    alignItems: "center",
    // marginLeft: 5,
    // paddingLeft: 5,
  },

  around: {
    marginLeft: 20,
    //  marginTop: 10,
    fontWeight: "bold",
    fontSize: 13,
    color: "#EA7810",
  },

  level: {
    marginTop: 25,
  },

  textLevel: {
    fontSize: 15,
    fontWeight: "bold",
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
    marginTop: 8,
    // flexDirection:'row',
  },

  textDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#121C6E",
  },

  datePicker: {
    marginLeft: -10,
  },

  timePicker: {
    marginRight: 20,
  },

  dateAndTime: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#EA7810",
    marginLeft:15,
  },

  input: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputDate: {
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 145,
    height: 34,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputHours: {
    // marginLeft: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 145,
    height: 34,
    // paddingLeft: 10,
    alignItems: "center",
    paddingTop: 5,
  },

  invitation: {
    marginTop: 25,
    flexDirection: "column",
  },

  textInvitation: {
    fontSize: 15,
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: "#121C6E",
  },

  create: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 15,
  },

  textBtn: {
    fontSize: 20,
    color: "#f2f2f2",
  },

  dropdown: {
    width: "10%",
  },
  // dropdownToggle: {
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   padding: 10,
  //   width: 200,
  //   alignItems: 'center',
  // },
  dropdownToggleText: {
    fontSize: 16,
  },
  dropdownBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    width: 50,
    padding: 10,
  },
  // dropdownOption: {
  //   paddingVertical: 8,
  // },

  reinitialisation: {
    marginTop:10,
    color: "#121C6E",
    fontWeight: "bold",


    
  },
});

export default CreateScreen;
