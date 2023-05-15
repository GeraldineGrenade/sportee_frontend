import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import MessagesListScreen from './screens/MessagesListScreen';
import ProfilScreen from './screens/ProfilScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Recherche' screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Recherche') {
          iconName = 'search';
        } else if (route.name === 'Calendrier') {
          iconName = 'calendar';
        } else if (route.name === 'Créer') {
          iconName = 'plus-circle';
        } else if (route.name === 'Messages') {
          iconName = 'comments'
        }
 
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ffa500',
      tabBarInactiveTintColor: '#000080',
      headerShown: false,
    })}>
        <Tab.Screen name="Calendrier" component={CalendarScreen} />
        <Tab.Screen name="Recherche" component={HomeScreen} />
        <Tab.Screen name="Créer" component={CreateScreen} />
        <Tab.Screen name="Messages" component={MessagesListScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Profil" component={ProfilScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
