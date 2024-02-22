import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './screens/loginViews/LoginPage';
import MainMenu from './screens/loginViews/MainMenu';

import { firestore } from './backend/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
  
    checkAuthStatus();

    const checkFirestoreConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "reports"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
        console.log('Connected to Firestore');
      } catch (error) {
        console.error('Error connecting to Firestore:', error);
      }
    };

    checkFirestoreConnection();
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={RootNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const RootNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
