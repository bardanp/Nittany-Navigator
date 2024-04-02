// Bardan.js
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../backend/firebase'
import {
    Alert,
    Modal,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    TouchableWithoutFeedback,
    FlatList,
    Image,
  } from 'react-native';

// Dummy data for testing
const eventInfo = {
    title: "title",
    description: "description",
    // image: "  ",
    dateTime: Timestamp.now(),
    location: "location",
    organizer: "organizer",
    contactEmail: "email",
    rsvpCount: 0,
    category: "NEEDS TO BE FROM OPTIONS.JS",
    submittedOn: Timestamp.now(),
    createdBy: "createdBy", 
  };


export const testSubmitEvent = async () => {
    console.log('Submitting event...');
    try {
      await addDoc(collection(firestore, 'events'), eventInfo);

      console.log('Event added successfully!');
      Alert.alert('Success', 'Event added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding event to Firestore:', error);
      Alert.alert('Error', 'Failed to add the event.');
    }
};
