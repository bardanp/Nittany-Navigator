import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { firestore } from '../../backend/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import options from '../../backend/options.json';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const AddNewEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await addDoc(collection(firestore, 'events'), {
        title,
        description,
        dateTime: date ? Timestamp.fromMillis(date.getTime()) : null,
        location,
      });
      console.log('Event added to Firestore successfully!');
      navigation.navigate('SubmitSuccess');
    } catch (error) {
      console.error('Error adding event to Firestore:', error);
      // Handle error, e.g., show an alert or handle it in another way
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.inputMultiline}
        placeholder="Description"
        multiline
        onChangeText={setDescription}
        value={description}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
        <Text>Pick Date & Time</Text>
      </TouchableOpacity>
      {date && (
        <Text>Selected Date: {date.toString()}</Text>
      )}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          setDate(new Date(selectedDate));
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <TouchableOpacity onPress={() => setShowLocationPicker(true)} style={styles.button}>
        <Text>Select Location (Optional)</Text>
      </TouchableOpacity>
      <Modal
        visible={showLocationPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLocationPicker(false)}>
        <View style={styles.centeredModalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <Picker
              selectedValue={location}
              onValueChange={(itemValue) => {
                setLocation(itemValue);
                setShowLocationPicker(false);
              }}
              style={{height: 150, width: 300}}>
              {options.locations.map((loc) => (
                <Picker.Item key={loc.id} label={loc.name} value={loc.name} />
              ))}
            </Picker>
            <TouchableOpacity onPress={() => setShowLocationPicker(false)} style={styles.modalButton}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {location && (
        <Text>Selected Location: {location}</Text>
      )}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text>Submit Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '80%',
    alignSelf: 'center',
    marginTop: '50%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {
    width: '100%',
    height: 200,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  centeredModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default AddNewEvent;