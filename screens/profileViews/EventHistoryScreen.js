import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const EventHistoryScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Event History</Text>
      {/* Placeholder for your event list items */}
      <Text>Here will be the list of events you've attended or created.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EventHistoryScreen;
