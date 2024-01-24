import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Tab = createBottomTabNavigator();

const events = [
  { id: '1', title: 'Event 1', description: 'Event 1 Description' },
  { id: '2', title: 'Event 2', description: 'Event 2 Description' },
  { id: '3', title: 'Event 3', description: 'Event 3 Description' },
  { id: '4', title: 'Event 4', description: 'Event 5 Description' },
  { id: '5', title: 'Event 5', description: 'Event 5 Description' },
  { id: '6', title: 'Event 6', description: 'Event 6 Description' },
  { id: '7', title: 'Event 7', description: 'Event 7 Description' },
  { id: '8', title: 'Event 8', description: 'Event 8 Description' },
  { id: '9', title: 'Event 9', description: 'Event 9 Description' },
  { id: '10', title: 'Event 10', description: 'Event 10 Description' },
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
            <Text style={styles.desc}>{item.description}</Text>
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
        <Tab.Screen options={{ tabBarBadge: events.length  }} name="Events" component={HomeScreen} />
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
    backgroundColor: '#0E67B4',
    padding: 5,
    paddingTop: 15,
    paddingLeft: 15,
    marginVertical: 4,
    marginHorizontal: 5,
    borderRadius: 15,
    height: 70,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  desc: {
    fontSize: 12,
    color: 'white',
  }
});
