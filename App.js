
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import ConnectionMailScreen from './screens/ConnectionMailScreen';
import CreateScreen from './screens/CreateScreen';
import MessagesListScreen from './screens/MessagesListScreen';
import ProfilScreen from './screens/ProfilScreen';
import MessagesScreen from './screens/MessagesScreen';
import ActivityScreen from './screens/ActivityScreen';
import SignupJoinScreen from './screens/SignupJoinScreen';
import SignUpPreferencesScreen from './screens/SignupPreferencesScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import preferences from './reducers/preferences';
import activities from './reducers/activities';

const store = configureStore({
  reducer: { user, preferences, activities },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Conversation" component={MessagesScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  )
};

const CalendarStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Conversation" component={MessagesScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  )
};

const CreateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Conversation" component={MessagesScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  )
};

const MessagesListStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagesList" component={MessagesListScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Conversation" component={MessagesScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  )
};

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Recherche' screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Recherche') {
          iconName = 'search';
        } else if (route.name === 'Calendrier') {
          iconName = 'calendar-alt';
        } else if (route.name === 'Créer') {
          iconName = 'plus-circle';
        } else if (route.name === 'Messages') {
          iconName = 'comments'
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />
          ;
      },
      tabBarActiveTintColor: '#ffa500',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle: { backgroundColor: '#121C6E' },
      headerShown: false,
    })}>
      <Tab.Screen name="Calendrier" component={CalendarStack} />
      <Tab.Screen name="Recherche" component={HomeStack} />
      <Tab.Screen name="Créer" component={CreateStack} />
      <Tab.Screen name="Messages" component={MessagesListStack} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ConnectionAll" component={ConnectionScreen} />
          <Stack.Screen name="ConnectionMail" component={ConnectionMailScreen} />
          <Stack.Screen name="SignUpJoin" component={SignupJoinScreen} />
          <Stack.Screen name="SignUpPreferences" component={SignUpPreferencesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
