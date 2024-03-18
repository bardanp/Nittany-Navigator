import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Alert,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { auth, firestore, storage } from '../../backend/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import options from '../../backend/options.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
  const handleSubmit = async () => {
    console.log('Submitting report...');
    try {
  
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        console.log('User info found:', userInfoString);
        const userInfo = JSON.parse(userInfoString);
        const createdBy = `${userInfo.firstName} ${userInfo.lastName.charAt(0)}.`;
  
        await addDoc(collection(firestore, 'reports'), {
          title,
          emergency,
          description,
          dateTime: date ? Timestamp.fromMillis(date.getTime()) : null,
          location: locationId ? options.locations.find((loc) => loc.id === locationId).name : '',
          category: categoryId ? options.categories.find((cat) => cat.id === categoryId).name : '',
          createdBy: createdBy,
        });
  
        console.log('Report added successfully!');
        Alert.alert('Success', 'Report added successfully!');
        navigation.goBack();
      } else {
        console.log('User information not found.');
        Alert.alert('Error', 'User information not found.');
      }
    } catch (error) {
      console.error('Error adding report to Firestore:', error);
      Alert.alert('Error', 'Failed to add the report.');
    }
  };
  

  const renderImage = () => {
    if (image) {
      return (
        <View>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity onPress={clearImage} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      );
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
    const selectedLocation = locationId ? options.locations.find((loc) => loc.id === locationId) : null;
    if (selectedLocation) {
      return <Text style={styles.selectedText}>Selected Location: {selectedLocation.name}</Text>;
    }
    return null;
  };

  const renderSelectedCategory = () => {
    const selectedCategory = categoryId ? options.categories.find((cat) => cat.id === categoryId) : null;
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
        placeholderTextColor="#999"
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Emergency:</Text>
        <Switch
          onValueChange={setEmergency}
          value={emergency}
          trackColor={{ false: '#ccc', true: '#3498db' }}
          thumbColor={emergency ? '#fff' : '#f4f3f4'}
        />
      </View>
      <TextInput
        style={styles.inputMultiline}
        placeholder="Description"
        multiline
        onChangeText={setDescription}
        value={description}
        placeholderTextColor="#999"
      />
      <View style={styles.actionContainer}>
        <Text style={styles.actionText} onPress={() => setShowDatePicker(true)}>
          Pick Date & Time
        </Text>
        {renderSelectedDate()}
      </View>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          setDate(new Date(selectedDate));
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <View style={styles.actionContainer}>
        <Text style={styles.actionText} onPress={() => setShowLocationPicker(true)}>
          Select Location
        </Text>
        {renderSelectedLocation()}
      </View>
      <Modal
        visible={showLocationPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowLocationPicker(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <FlatList
                data={options.locations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setLocationId(item.id);
                      setShowLocationPicker(false);
                    }}
                  >
                    <Text style={styles.item}>{item.name}</Text>
                  </TouchableWithoutFeedback>
                )}
              />
              <TouchableWithoutFeedback onPress={() => setShowLocationPicker(false)}>
                <View style={[styles.modalButton, styles.closeButton]}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.actionContainer}>
        <Text style={styles.actionText} onPress={() => setShowCategoryPicker(true)}>
          Select Category
        </Text>
        {renderSelectedCategory()}
      </View>
      <Modal
        visible={showCategoryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCategoryPicker(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <FlatList
                data={options.categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCategoryId(item.id);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text style={styles.item}>{item.name}</Text>
                  </TouchableWithoutFeedback>
                )}
              />
              <TouchableWithoutFeedback onPress={() => setShowCategoryPicker(false)}>
                <View style={[styles.modalButton, styles.closeButton]}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableWithoutFeedback onPress={handleSubmit}>
        <View style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit Report</Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 150,
    width: '100%',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  actionText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedText: {
    fontSize: 16,
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
    borderRadius: 12,
    elevation: 5,
    padding: 25,
    alignItems: 'center',
    maxHeight: '80%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    color: '#333',
    width: '100%',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#bdc3c7',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNewReport;
