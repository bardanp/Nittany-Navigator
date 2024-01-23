import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Tab = createBottomTabNavigator();

const events = [
  { id: '1', title: 'Event 1', description: 'Event 1 Description' },
  { id: '2', title: 'Event 2', description: 'Event 2 Description' },
  { id: '3', title: 'Event 3', description: 'Event 3 Description' },
];

function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarActiveTintColor: '#007bff', tabBarInactiveTintColor: '#a9a9a9',}}>
        <Tab.Screen name="Events" component={HomeScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },
  eventItem: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 15,
    borderRadius: 15,
    height: 75,
    paddingTop: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    color: 'black',
    height: 40,
  },
});
