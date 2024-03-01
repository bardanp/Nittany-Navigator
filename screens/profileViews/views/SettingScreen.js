import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SettingScreen = () => {
  const navigation = useNavigation();

  const settingsOptions = [
    { title: 'Notifications', description: 'Manage notification preferences.', iconName: 'notifications', handler: 'Notifications' },
    { title: 'Privacy', description: 'View and manage privacy settings.', iconName: 'privacy-tip', handler: 'Privacy' },
    { title: 'Advanced Settings', description: 'Access advanced settings and configurations.', iconName: 'settings-suggest', handler: 'AdvancedSettings' },
    { title: 'Account Settings', description: 'Manage your account preferences and details.', iconName: 'manage-accounts', handler: 'AccountSettings' },
  ];

  const handleLogout = () => {
    console.log("Logout button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        {settingsOptions.map((option, index) => (
          <TouchableOpacity style={styles.optionContainer} key={index} onPress={() => navigation.navigate(option.handler)}>
            <View style={styles.optionIcon}>
              <MaterialIcons name={option.iconName} size={28} color="#007AFF" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#C7C7CC" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={[styles.optionContainer, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  scrollViewContainer: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1A202C',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 5,
    padding: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 1,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: '#718096',
  },
  logoutButton: {
    backgroundColor: '#E53E3E',
    shadowOpacity: 0.1,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SettingScreen;
