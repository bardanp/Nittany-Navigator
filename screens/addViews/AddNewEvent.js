import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Platform, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'; 
import{ firestore } from '../../backend/firebase';
import { collection, addDoc } from "firebase/firestore";

const AddNewEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toLocaleDateString()); 
  const [location, setLocation] = useState(''); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [showLocationPicker, setShowLocationPicker] = useState(false); 
  const [date, setDate] = useState(new Date()); 

  const navigation = useNavigation();

  const locationOptions = [
    { label: "Olmsted", value: "Olmsted" },
    { label: "Library", value: "Library" },
    { label: "Eab", value: "Eab" },
  ];

  const handleLocationSelect = (value) => {
    setLocation(value);
    setShowLocationPicker(false);
  };

  const handleSubmit = async () => {
    try {
        await addDoc(collection(firestore, 'reports'), {
          title,
          description,
          image,
          dateTime,
          location,
        });
        console.log('Report added to Firestore successfully!');
        navigation.goBack(); // Go back to the previous screen
        navigation.navigate('SubmitSuccess'); // Navigate to the success screen
    } catch (error) {
        console.error('Error adding report to Firestore:', error);
    }
  };

  
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDateTime(currentDate.toLocaleDateString()); 
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Event</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Time and Date"
          value={dateTime}
          onFocus={() => setShowDatePicker(true)} 
          showSoftInputOnFocus={false} 
        />

        <TouchableOpacity
          onPress={() => setShowLocationPicker(true)}
          style={styles.input}
        >
          <Text>{location || "Select Location"}</Text>
        </TouchableOpacity>

        <Modal
          visible={showLocationPicker}
          transparent={true}
          animationType="slide"
        >
          <View style={customStyles.centeredView}>
            <View style={customStyles.modalView}>
              {locationOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLocationSelect(option.value)}
                  style={customStyles.option}
                >
                  <Text style={customStyles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.datePickerText}>{`Date: ${date.toLocaleDateString()}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const customStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 10,
  },
  optionText: {
  },
});

export default AddNewEvent;