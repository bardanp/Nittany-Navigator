import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubmitSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Submitted Successfully!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.replace('AddNewReport')}
      >
        <Text style={styles.buttonText}>Submit Another Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default SubmitSuccessScreen;
