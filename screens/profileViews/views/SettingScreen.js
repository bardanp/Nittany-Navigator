import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handlePrivacy = () => {
    navigation.navigate('Privacy');
  };

  const handleAdvancedSettings = () => {
    navigation.navigate('AdvancedSettings');
  };

  const handleAccountSettings = () => {
    navigation.navigate('AccountSettings');
  };

  const handleLogout = () => {
    console.log("Logout button pressed");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <TouchableOpacity style={styles.optionContainer} onPress={handleNotifications}>
        <Text style={styles.optionTitle}>Notifications</Text>
        <Text style={styles.optionDescription}>Manage notification preferences.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handlePrivacy}>
        <Text style={styles.optionTitle}>Privacy</Text>
        <Text style={styles.optionDescription}>View and manage privacy settings.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleAdvancedSettings}>
        <Text style={styles.optionTitle}>Advanced Settings</Text>
        <Text style={styles.optionDescription}>Access advanced settings and configurations.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleAccountSettings}>
        <Text style={styles.optionTitle}>Account Settings</Text>
        <Text style={styles.optionDescription}>Manage your account preferences and details.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionContainer, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 75,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 10,
  },
  optionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
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
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SettingScreen;
