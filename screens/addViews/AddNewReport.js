import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Ensure this is imported
import styles from './styles';
import { firestore } from '../../backend/firebase'; 
import { collection, addDoc } from 'firebase/firestore';


const AddNewReport = () => {
  const [title, setTitle] = useState('');
  const [emergency, setEmergency] = useState(false); 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
        await addDoc(collection(firestore, 'reports'), {
            title,
            emergency,
            description,
            image,
            dateTime, 
            location,
        });
        console.log('Report added to Firestore successfully!');
        navigation.goBack(); 
        navigation.navigate('SubmitSuccess'); 
    } catch (error) {
        console.error('Error adding report to Firestore:', error);
    }
  };
  

  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Report</Text>
      </View>
      {/* Content */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Emergency:</Text>
      <Switch
        value={emergency}
        onValueChange={setEmergency}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />
      <Text style={styles.label}>Time and Date:</Text>
      <TextInput
        style={styles.input}
        value={dateTime}
        onChangeText={setDateTime}
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};


export default AddNewReport;
