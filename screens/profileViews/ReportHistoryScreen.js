import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ReportHistoryScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Report History</Text>
      {/* Placeholder for your report list items */}
      <Text>Here will be the list of reports you've submitted.</Text>
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

export default ReportHistoryScreen;
