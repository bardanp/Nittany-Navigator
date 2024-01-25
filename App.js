import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, TouchableOpacity, StyleSheet, Text, View, FlatList, Button } from 'react-native';

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
  { id: '11', title: 'Event 11', description: 'Event 11 Description' },
  { id: '12', title: 'Event 12', description: 'Event 12 Description' },
  { id: '13', title: 'Event 13', description: 'Event 13 Description' },
  { id: '14', title: 'Event 14', description: 'Event 14 Description' },
  { id: '15', title: 'Event 15', description: 'Event 15 Description' },
];

//Map/Events Page
function HomeScreen() {
  return (
      <View style={styles.screenContainer}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePress(item.description)}
                style={styles.viewButtonContainer}
              >
                <Text style={styles.viewButtonText}>View Info</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }


  //Change this so there is a better UI 
const handlePress = (description) => {
  alert('Description: ' + description);
};


//Notification Page
function NotificationsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

//Settings Page
function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}

//Main App
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#007bff', tabBarInactiveTintColor: '#a9a9a9',}}>
        <Tab.Screen options={{ tabBarBadge: events.length  }} name="Events" component={HomeScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//Style Sheet
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'left',
    alignContent: 'left',
    padding: 10,
  },
  eventItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#0E67B4',
    padding: 15, 
    marginVertical: 4,
    marginHorizontal: 5,
    borderRadius: 15,
    minHeight: 70,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  viewButtonContainer: {
    backgroundColor: '#FFD700', 
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
