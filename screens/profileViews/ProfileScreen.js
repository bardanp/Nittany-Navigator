import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {

  const navigation = useNavigation();


  const handleSettings = () => {
    navigation.navigate('Settings');
  };

    // Inside ProfileScreen component
  const handleEventHistory = () => {
    navigation.navigate('EventHistory');
  };

  const handleReportHistory = () => {
    navigation.navigate('ReportHistory');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };


  const profileOptions = [
      { title: 'Event History', description: 'View past events and their details.', iconName: 'history', handler: 'EventHistory' },
      { title: 'Report History', description: 'View past reports and their details.', iconName: 'report', handler: 'ReportHistory' },
      { title: 'About', description: 'Learn more about the application and its creators.', iconName: 'info', handler: 'About' },
      { title: 'Settings', description: 'Adjust profile settings and preferences.', iconName: 'settings', handler: 'Settings' },
    ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <Image source={require('../../assets/no-profile.png')} style={styles.profileIcon} />
          <Text style={styles.username}>John Doe</Text>
        </View>

        {profileOptions.map((option, index) => (
          <TouchableOpacity style={styles.optionContainer} key={index} onPress={() => navigation.navigate(option.handler)}>
            <View style={styles.optionIcon}>
              {/* Adjust the icon library as necessary, here using MaterialIcons for consistency */}
              <MaterialIcons name={option.iconName} size={28} color="#007AFF" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
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
  profileIcon: {
    width: 80, // Increased size for profile
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
});

export default ProfileScreen;