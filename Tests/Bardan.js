import options from '../backend/options.json'; 
import { firestore } from '../backend/firebase';
import { Timestamp } from 'firebase/firestore';
import { Alert } from 'react-native';

const dummyData = {
  title: "dklsf",
  description: "description1",
  dateTime: new Date().toISOString(), 
  location: "Library", 
  organizer: "organizer1",
  contactEmail: "me@me.com",
  rsvpCount: 0,
  category: "Religious gathering", 
  createdBy: "userID",
};

const dummyEvent = {
  id: 'event-123',
  title: "Community Cleanup",
  description: "Join us for a community cleanup event!",
  dateTime: Timestamp.fromDate(new Date('2024-04-15T09:00:00')), 
  location: "Park",
  organizer: "Community Volunteers",
  contactEmail: "volunteer@community.org",
  rsvpCount: 30,
  category: "Volunteering and community service",
  createdBy: "Organizer Name",
  isEvent: true, 
  image: "https://example.com/event_image.jpg", 
};

const dummyReport = {
  id: 'NscQfLhysrvUC4qg2M8B',
  title: "My Report",
  description: "This is my Report",
  dateTime: Timestamp.fromDate(new Date('2024-03-30T15:00:00')), 
  location: "Courtyard",
  createdBy: "Vy D.",
  emergency: false,
  category: "Volunteering and community service",
  image: "",
  submittedOn: Timestamp.fromDate(new Date('2024-03-30T15:06:34')), 
  type: "report", 
};

export const fetchDummyEvent = async () => {
  return Promise.resolve(dummyEvent);
};

export const fetchDummyReport = async () => {
  return Promise.resolve(dummyReport);
};



export const testSubmitEvent = async () => {
  console.log('Submitting event...');

  if (!dummyData.title || !dummyData.description || !dummyData.location || !dummyData.category || !dummyData.createdBy) {
    Alert.alert('Missing Information', 'Please fill in all required fields.');
    console.error('Missing Information, please fill in all required fields.');
    return; 
  }

  const selectedLocation = options.locations.find(loc => loc.name === dummyData.location);
  const selectedCategory = options.categories.find(cat => cat.name === dummyData.category);

  if (!selectedLocation || !selectedCategory) {
    Alert.alert('Invalid Selection', 'Please select a valid location and category.');
    console.error('Invalid Selection, please select a valid location and category.');
    return; 
  }

  const eventInfo = {
    ...dummyData,
    location: selectedLocation.name,
    category: selectedCategory.name,
    dateTime: Timestamp.fromDate(new Date(dummyData.dateTime)),
  };

  try {
    await addDoc(collection(firestore, 'events'), eventInfo);
    Alert.alert('Success', 'Event added successfully to Firebase!');
  } catch (error) {
    console.error('Error adding event to Firestore:', error);
    Alert.alert('Error', 'Failed to add the event. to Firebase');
  }
};
