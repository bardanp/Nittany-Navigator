import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Routes = {
  ADD_NEW_EVENT: 'addNewEvent',
  ADD_NEW_REPORT: 'addNewReport',
  HOME: 'Home',
};

const OptionButton = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress} accessibilityLabel={title} accessibilityHint={description}>
    <Text style={styles.optionTitle}>{title}</Text>
    <Text style={styles.optionDescription}>{description}</Text>
  </TouchableOpacity>
);

const AddPage = () => {
  const navigation = useNavigation();

  const navigateTo = (routeName) => () => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <OptionButton
        title="Add an Event"
        description="Create a new event and share it with others. Provide details such as title, description, location, date and time, and any additional information."
        onPress={navigateTo(Routes.ADD_NEW_EVENT)}
      />
      <OptionButton
        title="Add a Report"
        description="Submit a report for an incident or observation. Include details such as title, description, urgency level, location, date and time, and any relevant images."
        onPress={navigateTo(Routes.ADD_NEW_REPORT)}
      />
      <TouchableOpacity style={[styles.optionContainer, styles.backButton]} onPress={navigateTo(Routes.HOME)}>
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
    padding: 10,
  },
  optionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '90%', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    color: '#333',
  },
  backButton: {
    backgroundColor: '#FF6347',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center', 
  },
});

export default AddPage;
