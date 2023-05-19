import React, { useState }from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, KeyboardAvoidingView, ScrollView, Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectionSport from '../components/SelectionSport';
import { useSelector, useDispatch } from 'react-redux';
import ModaleSports from '../components/ModaleSports';
import DropDownPicker from "react-native-dropdown-picker";
import SelectionTxt from '../components/SelectionTxt';

const BACKEND_ADRESS = 'https://sportee-backend.vercel.app/'

const activityData = {
  name: 'Nom de l\'activité',
  sport: 'Sport de l\'activité',
  description: 'Description de l\'activité',
  place: 'Lieu de l\'activité',
  level: 'Niveau de l\'activité',
  time: 'Durée de l\'activité',
  nbMaxParticipants: 10,
  conversation: 'Conversation associée',
  user: 'Utilisateur associé',
  particpants: ['Participant 1', 'Participant 2', ''],
};


const levelTitles = [
  'Sportif du dimanche',
  'Débutant',
  'Inter médiaire',
  'Expert'
]


const CreateScreen = ({ navigation }) => {

  //CREATE STATE SELECT SPORT
const [newSport, setNewSport] = useState({name:'Choisis ton sport' , icon:'https://res.cloudinary.com/dsd7uux0v/image/upload/v1684260544/sportee/addition-thick-symbol_b3edkd.png' })

const [level, setLevel] = useState('')
 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectSport = () => {
    setIsModalVisible(true)
    
}
  
  const selectTxt = (data) => {
    setLevel(data.title)
}
  console.log(level)
  const closeModal = (sport) => {
  setIsModalVisible(false)
  setNewSport(sport)
}   

// VALIDATE CREATE ACTIVITY
  const handleCreate = () => {

    fetch(`${BACKEND_ADRESS}/activities`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(activityData)
  }).then(response => {
      if(response.ok) {
          return response.json()
      }else {
        throw new Error('Erreur lors de la création de l\'activité')
      }
  }).then(data => {
      console.log(data);
  }).catch(error => {
      console.error(error);
  })
  }
  // CHOICE THE LEVEL 
  const levelList = levelTitles.map((e, i) => {
    //Verify if the level has been selected beforehand
    let isSelected = false
    if (level === e) isSelected = true

    return <SelectionTxt key={i} category='level' isSelected={isSelected} selectTxt={selectTxt} title={e} />
})

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
    {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Créé ton activité</Text>
        <View style={styles.userIconContainer}>
          <FontAwesome
            name="user"
            size={25}
            color="#f8f8ff"
            style={styles.userIcon}
            onPress={() => navigation.navigate("Profil")}/>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.name}>
          <Text style={styles.titre}>Titre</Text>
          <TextInput
            placeholder="Nom de l'activité"
            style={styles.inputSport}/>
        </View>
        <View style={styles.select}>
          <TouchableOpacity style={styles.selectSport}>
            <SelectionSport name={newSport.name} icon={newSport.icon}
             selectSport={selectSport} />
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
              style={styles.inputDescription}/>
          </View>
        </View>
        <View style={styles.adress}>
          <Text style={styles.textAdress}>Adresse du point de rendez-vous</Text>
          <TextInput style={styles.inputAdress}/>
        </View>

         <View style={styles.level}>
            <Text style={styles.textLevel}>Cette activité s'adresse aux</Text>
           <View style={styles.btn} >
              {levelList}  
            
          </View> 
        </View> 

        <View style={styles.date}>
            <Text style={styles.textDate}>Elle se tiendra le ...                            ... et durera environ</Text>
            <View style={styles.input} >
            <TextInput style={styles.inputDate} placeholder='Date et heure'>
            </TextInput>
            
            <TextInput style={styles.inputHours} placeholder='Heures'>
            </TextInput>
            </View>
        </View>

        <View style={styles.invitation} >
            <Text style={styles.textInvitation}>Je souhaite inviter</Text>
            <View style={styles.nbPersonne} >
            <TextInput style={styles.inputInvitation} placeholder='Nombre' keyboardType="numeric"/>
                                 
            <Text style={styles.personne}>personnes</Text>
            </View>
        </View>

        <View style={styles.create} >
            <TouchableOpacity onPress={() => handleCreate()} style={styles.createBtn}> 
            <Text style={styles.textBtn}>Créer mon activité</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: 'center',
    justifyContent: 'center'
  },

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
  },

  inputSport: {
    width: 216,
    height: 44,
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
    marginTop: 17,
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
  },

  inputDescription: {
    backgroundColor: "#f2f2f2",
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
  },

  inputAdress: {
    width: '100%',
    height: 45,
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },

  level: {
    marginTop: 25,
  },

  textLevel: {
    fontSize: 15,
  },

  btn: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  btn1:{
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: 71,
    height: 71,
    alignItems: 'center',
  },

  date: {
    marginTop: 25,
  },

  textDate: {
    fontSize: 15,
  },

  input: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },

  inputDate: {
    marginTop: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: 145,
    height: 34,
    paddingLeft: 10,
    flexDirection: 'row',
  },

  inputHours: {
    marginTop: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: 145,
    height: 34,
    paddingLeft: 10,
  },

  invitation: {
    marginTop: 25,
    flexDirection: 'column'
  },

  textInvitation: {
    fontSize: 15,
  },

  nbPersonne: {
    marginTop: 5,
    flexDirection: 'row',
  },

  inputInvitation: {
    marginTop: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: 137,
    height: 38,
    paddingLeft: 10,
  },

  personne: {
    fontSize: 15,
    paddingLeft: 5,
    marginTop: 10,
  },

  create: {
    marginTop: 65,
    alignItems: 'center',
  },

  createBtn: {
    backgroundColor: '#121C6E',
    borderRadius: 7,
    borderColor: '#121C6E',
    borderWidth: 1,
    width: 270,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtn: {
    fontSize: 20,
    color: "#f2f2f2",
    
  },

  dropDown: {
    width:'10%',
  },


  

});
