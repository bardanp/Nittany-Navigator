import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, Image, Modal, StyleSheet, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../../backend/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import options from '../../backend/options.json';
import { useNavigation } from '@react-navigation/native';

const AddNewReport = () => {
  const [title, setTitle] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const navigation = useNavigation();

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };
  

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `reports/${Date.now()}`);
    await uploadBytes(fileRef, blob);
    blob.close();

    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async () => {
    const imageUrl = image ? await uploadImageAsync(image) : '';
    try {
      await addDoc(collection(firestore, 'reports'), {
        title,
        emergency,
        description,
        image: imageUrl,
        dateTime: date ? Timestamp.fromMillis(date.getTime()) : null,
        location: locationId ? options.locations.find(loc => loc.id === locationId).name : '',
        category: categoryId ? options.categories.find(cat => cat.id === categoryId).name : '',
      });
      Alert.alert("Success", "Report added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error('Error adding report to Firestore:', error);
      Alert.alert("Error", "Failed to add the report.");
    }
  };

  const renderImage = () => {
    if (image) {
      return <Image source={{ uri: image }} style={styles.image} />;
    }
    return null;
  };

  const renderSelectedDate = () => {
    if (date) {
      return <Text style={styles.selectedText}>Selected Date: {date.toString()}</Text>;
    }
    return null;
  };

  const renderSelectedLocation = () => {
    const selectedLocation = locationId ? options.locations.find(loc => loc.id === locationId) : null;
    if (selectedLocation) {
      return <Text style={styles.selectedText}>Selected Location: {selectedLocation.name}</Text>;
    }
    return null;
  };

  const renderSelectedCategory = () => {
    const selectedCategory = categoryId ? options.categories.find(cat => cat.id === categoryId) : null;
    if (selectedCategory) {
      return <Text style={styles.selectedText}>Selected Category: {selectedCategory.name}</Text>;
    }
    return null;
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Report</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Emergency:</Text>
        <Switch
          onValueChange={setEmergency}
          value={emergency}
          trackColor={{ false: "#767577", true: "#f39c12" }}
          thumbColor={emergency ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
      <TextInput
        style={styles.inputMultiline}
        placeholder="Description"
        multiline
        onChangeText={setDescription}
        value={description}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>Pick Date & Time</Text>
      </TouchableOpacity>
      {renderSelectedDate()}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          setDate(new Date(selectedDate));
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <TouchableOpacity onPress={handleImagePick} style={styles.button}>
        <Text style={styles.buttonText}>Pick Image (Optional)</Text>
      </TouchableOpacity>
      {renderImage()}
      <TouchableOpacity onPress={() => setShowLocationPicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>Select Location (Optional)</Text>
      </TouchableOpacity>
      <Modal
        visible={showLocationPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLocationPicker(false)}>
        <TouchableWithoutFeedback onPress={() => setShowLocationPicker(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <FlatList
                data={options.locations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    setLocationId(item.id);
                    setShowLocationPicker(false);
                  }}>
                    <Text style={styles.item}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setShowLocationPicker(false)} style={[styles.modalButton, styles.closeButton]}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {renderSelectedLocation()}

      <TouchableOpacity onPress={() => setShowCategoryPicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>Select Category</Text>
      </TouchableOpacity>
      <Modal
        visible={showCategoryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryPicker(false)}>
        <TouchableWithoutFeedback onPress={() => setShowCategoryPicker(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <FlatList
                data={options.categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    setCategoryId(item.id);
                    setShowCategoryPicker(false);
                  }}>
                    <Text style={styles.item}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)} style={[styles.modalButton, styles.closeButton]}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {renderSelectedCategory()}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Remaining code is the same as before, I'll just adjust the styles

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#ecf0f1',
    fontSize: 18,
    color: '#333',
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 150,
    textAlignVertical: 'top',
    backgroundColor: '#ecf0f1',
    fontSize: 18,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  selectedText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    minWidth: 300,
    padding: 25,
    alignItems: 'center',
    maxHeight: '80%', 
    alignSelf: 'center', 
    marginTop: 'auto', 
    marginBottom: 'auto',
  },  
  modalTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20, 
    textAlign: 'center',
    color: '#2c3e50',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    marginBottom: 20,
    maxHeight: 150,
  },
  picker: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  item: {
    fontSize: 18, // Ensure items are legible
    padding: 10, // More padding for a touch-friendly UI
    borderWidth: 1, // Subtle borders for each item
    borderColor: '#ecf0f1', // Soft color for the borders
    borderRadius: 10, // Rounded corners for a modern look
    marginVertical: 5, // Space between items
    backgroundColor: '#ecf0f1', // Light background for each item
    color: '#333', // Text color that contrasts well with the background
    width: 250, // Fixed width for consistency
    textAlign: 'center', // Center align text
  },
  modalButton: {
    backgroundColor: '#3498db', // Consistent button color
    padding: 15,
    borderRadius: 20, // Rounded corners for buttons
    alignItems: 'center',
    alignSelf: 'stretch', // Stretch to fit the modal width
    marginVertical: 10, // Space above and below
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#7f8c8d',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
});


export default AddNewReport;
