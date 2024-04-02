import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from "./screens/loginViews/LoginPage";
import MainMenu from "./screens/loginViews/MainMenu";
import ProfileScreen from "./screens/profileViews/ProfileScreen";
import SettingsScreen from "./screens/profileViews/views/SettingScreen";
import SubmitSuccessScreen from "./screens/addViews/SubmitSuccessScreen";
import AdminPanel from "./screens/profileViews/views/Admin/AdminPanel";
import SavedEventsReports from "./screens/profileViews/views/SavedEventsReports";
import UserEventsReports from "./screens/profileViews/views/UserEventsReports";
import HomeScreen from "./screens/mapListViews/HomeScreen"
import { firestore } from "./backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import About from "./screens/profileViews/views/About";

//Testing
import { testSubmitEvent } from "./Tests/Bardan";


const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // TESTING
    console.log("About to test event submission...");
    testSubmitEvent().then(result => {
      console.log("Test submission result:", result ? "Success" : "Failure");
    }).catch(error => {
      console.error("Test submission error:", error);
    });
  // END TESTING

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();

    const checkFirestoreConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "reports"));
        // console.log("Connected to Firestore");
      } catch (error) {
        // console.error("Error connecting to Firestore:", error);
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
        <Stack.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubmitSuccess"
          component={SubmitSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SavedEventsReports"
          component={SavedEventsReports}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserEventsReports"
          component={UserEventsReports}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
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
    </ProfileStack.Navigator>
  );
};
