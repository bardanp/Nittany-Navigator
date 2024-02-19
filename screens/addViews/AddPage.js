import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddPage = () => {
  const navigation = useNavigation();

  const handleAddEvent = () => {
    navigation.navigate('addNewEvent');
  };

  const handleAddReport = () => {
    navigation.navigate('addNewReport');
  };

  const handleBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionContainer} onPress={handleAddEvent}>
        <Text style={styles.optionTitle}>Add an Event</Text>
        <Text style={styles.optionDescription}>
          Create a new event and share it with others. Provide details such as title, description, location, date and time, and any additional information.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleAddReport}>
        <Text style={styles.optionTitle}>Add a Report</Text>
        <Text style={styles.optionDescription}>
          Submit a report for an incident or observation. Include details such as title, description, urgency level, location, date and time, and any relevant images.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionContainer, styles.backButton]} onPress={handleBack}>
        <Text style={styles.optionText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  optionDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#dc3545',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddPage;
