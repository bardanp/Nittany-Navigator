import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './screens/loginViews/LoginPage';
import MainMenu from './screens/loginViews/MainMenu';
import ProfileScreen from './screens/profileViews/ProfileScreen';
import SettingsScreen from './screens/profileViews/views/SettingScreen';

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
          component={RootNavigator} // Pass component directly
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileStackNavigator} // Use ProfileStackNavigator here
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



// const RootNavigator = ({ isAuthenticated }) => {
//   return (
//     <Stack.Navigator>
//       {!isAuthenticated ? (
//         <Stack.Screen
//           name="LoginPage"
//           component={LoginPage}
//           options={{ headerShown: false }}
//         />
//       ) : (
//         <Stack.Screen
//           name="MainMenu"
//           component={MainMenu}
//           options={{ headerShown: false }}
//         />
//       )}
//     </Stack.Navigator>
//   );
// };

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

// Define ProfileStackNavigator
const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      {/* Add other screens for Profile here */}
    </ProfileStack.Navigator>
  );
};
