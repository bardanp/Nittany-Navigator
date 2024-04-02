// Bardan.js
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../backend/firebase'
import { Alert } from 'react-native';

// Dummy data for testing
const dummyData = {
    title: "title",
    description: "description",
    image: "NULL",
    dateTime: "dateTime",
    location: "location",
    organizer: "organizer",
    contactEmail: "email",
    rsvpCount: 0,
    category: "NEEDS TO BE FROM OPTIONS.JS",
    submittedOn: "submittedOn",
    createdBy: "createdBy", 
  };


export const testSubmitEvent = async () => {
    console.log('Submitting event...');
    try {
      await addDoc(collection(firestore, 'events'), dummyData
    );

      console.log('Event added successfully!');
      Alert.alert('Success', 'Event added successfully!');
    } catch (error) {
      console.error('Error adding event to Firestore:', error);
      Alert.alert('Error', 'Failed to add the event.');
    }
};
