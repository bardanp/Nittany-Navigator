import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/mapListViews/HomeScreen.js';
import ProfileScreen from './screens/profileViews/ProfileScreen.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuProvider } from 'react-native-popup-menu';
import AddPage from './screens/addViews/AddPage.js';
import AddNewEvent from './screens/addViews/AddNewEvent.js';
import AddNewReport from './screens/addViews/AddNewReport.js';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: true,
            tabBarStyle: {
              backgroundColor: '#007bff',
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarItemStyle: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
            tabBarIconStyle: {
              marginBottom: 5,
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#ccc',
          }}
        >
          <Tab.Screen
            name="Add"
            component={AddPage}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="add" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="person" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="addNewEvent"
            component={AddNewEvent}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="addNewReport"
            component={AddNewReport}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
