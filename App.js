
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import MessagesListScreen from './screens/MessagesListScreen';
import ProfilScreen from './screens/ProfilScreen';
import SignupJoinScreen from './screens/SignupJoinScreen';
import SignUpPreferencesScreen from './screens/SignupPreferencesScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user'

const store = configureStore({
 reducer: { user },
});


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
 
        return <FontAwesome name={iconName} size={size} color={color} />
        ;
      },
      tabBarActiveTintColor: '#ffa500',
      tabBarInactiveTintColor: '#000080',
      // tabBarColor: '#121C6E',
      headerShown: false,
    })}
    tabBarOptions={{
      tabBarStyle: { backgroundColor: '#121C6E' }, 
    }}
    >
      
        <Tab.Screen name="Calendrier" component={CalendarScreen} />
        <Tab.Screen name="Recherche" component={HomeScreen} />
        <Tab.Screen name="Créer" component={CreateScreen} />
        <Tab.Screen name="Messages" component={MessagesListScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Profil" component={ProfilScreen} /> 
          {/* <Stack.Screen name="SignUpJoin" component={SignupJoinScreen} />
          <Stack.Screen name="SignUpPreferences" component={SignUpPreferencesScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
