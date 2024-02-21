import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../mapListViews/HomeScreen.js';
import ProfileScreen from '../profileViews/ProfileScreen.js';
import AddPage from '../addViews/AddPage.js';
import AddNewEvent from '../addViews/AddNewEvent.js';
import AddNewReport from '../addViews/AddNewReport.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuProvider } from 'react-native-popup-menu';

const Tab = createBottomTabNavigator();
const AddStack = createStackNavigator();

const AddStackScreen = () => (
  <AddStack.Navigator initialRouteName="AddPage">
    <AddStack.Screen name="AddPage" component={AddPage} options={{ headerShown: false }} />
    <AddStack.Screen name="addNewEvent" component={AddNewEvent} />
    <AddStack.Screen name="addNewReport" component={AddNewReport} />
  </AddStack.Navigator>
);

const MainMenu = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
      initialRouteName="Home"
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
          component={AddStackScreen}
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
      </Tab.Navigator>
    </MenuProvider>
  );
};

export default MainMenu;
