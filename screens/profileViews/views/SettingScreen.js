import React from 'react';
import { View, Dimensions, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

import keys from '../../../keys.json';

const SettingScreen = () => {
  const navigation = useNavigation();
  const { tenantId } = keys;

  const settingsOptions = [
    {
      title: 'Notifications',
      description: 'Manage notification preferences.',
      iconName: 'notifications',
      handler: () => navigation.navigate('NotificationSettings')
    },
    {
      title: 'Privacy',
      description: 'View and manage privacy settings.',
      iconName: 'privacy-tip',
      handler: () => Alert.alert("Coming Soon!")
    },
    {
      title: 'Other Settings',
      description: 'Access other settings and configurations.',
      iconName: 'settings',
      handler: () => Alert.alert("Coming Soon!")
    },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');

      const logoutUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(makeRedirectUri({
        scheme: 'nittany-navigator',
      }))}`;

      console.log('User logged out. Redirecting to:', logoutUrl);

      await WebBrowser.openBrowserAsync(logoutUrl);

      navigation.navigate('LoginPage');
      alert('You have been logged out.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
              <TouchableOpacity style={styles.optionContainer} key={index} onPress={option.handler}>
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

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const scale = size => (width / 428) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  scrollViewContainer: {
    padding: scale(20),
    paddingTop: scale(50),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(30),
    position: 'relative',
  },
  title: {
    fontSize: scale(26),
    fontWeight: '600',
    color: '#1A202C',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: scale(5),
    padding: scale(12),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    marginBottom: scale(16),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.05,
    shadowRadius: scale(12),
    elevation: scale(1),
  },
  optionIcon: {
    marginRight: scale(16),
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: scale(2),
  },
  optionDescription: {
    fontSize: scale(14),
    color: '#718096',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    borderRadius: scale(8),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
  logoutText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default SettingScreen;
