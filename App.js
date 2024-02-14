import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; 
import AddScreen from './screens/AddScreen';
import SettingsScreen from './screens/SettingsScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faCirclePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
// To use the above icons you must do the following in your directory: 
// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-native-fontawesome


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Add') {
              return <FontAwesomeIcon icon={faCirclePlus} size={size} color={color} />;
            } else if (route.name === 'Home') {
              return <FontAwesomeIcon icon={faHouse} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              return <FontAwesomeIcon icon={faCircleUser} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#a9a9a9',
        })}
        initialRouteName="Home" // Set the initial route to Home
      >
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}