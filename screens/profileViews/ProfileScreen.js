import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleEventHistory = () => {
    navigation.navigate('EventHistory');
  };

  const handleReportHistory = () => {
    navigation.navigate('ReportHistory');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };


  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/no-profile.png')} style={styles.profileIcon} />
        <Text style={styles.username}>John Doe</Text>
      </View>
      <TouchableOpacity style={styles.optionContainer} onPress={handleEventHistory}>
        <Text style={styles.optionTitle}>Event History</Text>
        <Text style={styles.optionDescription}>View past events and their details.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleReportHistory}>
        <Text style={styles.optionTitle}>Report History</Text>
        <Text style={styles.optionDescription}>View past reports and their details.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleAbout}>
        <Text style={styles.optionTitle}>About</Text>
        <Text style={styles.optionDescription}>Learn more about the application and its creators.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleSettings}>
        <Text style={styles.optionTitle}>Settings</Text>
        <Text style={styles.optionDescription}>Adjust profile settings and preferences.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    justifyContent: 'center',
    alignContent: 'center',
  },
  optionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 16,
    color: '#333333',
  },
});

export default ProfileScreen;
