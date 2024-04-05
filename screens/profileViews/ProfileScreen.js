import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullName: 'Loading...',
    primaryAffiliation: 'Not specified',
    profilePicUri: null,
    campus: 'Not specified', 
  });
  

  const navigation = useNavigation();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    const loadUserInfo = async () => {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setUserInfo({
                email: userInfo.email,
                fullName: `${userInfo.firstName} ${userInfo.lastName}`,
                primaryAffiliation: capitalizeFirstLetter(userInfo.userType), 
                campus: userInfo.campus,
            });
        }
    };
    loadUserInfo();
  }, []);

  const profilePicSource = userInfo.profilePicUri ? { uri: userInfo.profilePicUri } : require('../../assets/no-profile.png');
  const isAdminUser = userInfo.primaryAffiliation.toUpperCase() !== 'STUDENT';


  const profileOptions = [
      { title: 'My Events & Reports', description: 'View events and reports made by you.', iconName: 'history', handler: 'UserEventsReports' },
      { title: 'Saved Events & Reports', description: 'View events and reports saved by you.', iconName: 'menu', handler: 'SavedEventsReports' },
      { title: 'About', description: 'Learn more about the application and its creators.', iconName: 'info', handler: 'About' },
      { title: 'Settings', description: 'Adjust profile settings and preferences.', iconName: 'settings', handler: 'Settings' },
    ];

    if (isAdminUser) {
      profileOptions.push({
        title: 'Testing Functions',
        description: 'Made for testing purposes only.',
        iconName: 'admin-panel-settings',
        handler: 'AdminPanel', 
      });
    }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.profileHeader}>
          <Image source={profilePicSource} style={styles.profileIcon} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userInfo.fullName}</Text>
            <Text style={styles.userDetail}>{userInfo.email}</Text>
            <Text style={styles.userDetail}>Campus: {userInfo.campus}</Text> 
            <Text style={styles.userDetail}>User Type: {userInfo.primaryAffiliation}</Text>
          </View>

        </View>

        <View style={styles.profileOptions}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionContainer} onPress={() => navigation.navigate(option.handler)}>
              <MaterialIcons name={option.iconName} size={28} color="#007AFF" />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>
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
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  userDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  profileOptions: {
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  optionTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
  },
  optionDescription: {
    fontSize: 14,
    color: '#718096',
  },
});

export default ProfileScreen;