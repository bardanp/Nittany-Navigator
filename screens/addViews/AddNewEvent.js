import React, { useState, useEffect } from 'react';
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
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { auth, firestore, storage } from '../../backend/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import options from '../../backend/options.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [organizer, setOrganizer] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [createdBy, setCreatedBy] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const [locationDetails, setLocationDetails] = useState('');
  const [validationMessage, setValidationMessage] = useState('');



  const [region, setRegion] = useState({
    latitude: 40.204444839295846,
    longitude: -76.74518002144552,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Please allow access to your photo library to upload images.');
        }
      }
    })();
    async function fetchUserInfo() {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        console.log('User info found:', userInfoString);
        const userInfo = JSON.parse(userInfoString);
        const createdByString = `${userInfo.firstName} ${userInfo.lastName.charAt(0)}.`;
        setCreatedBy(createdByString);
      } else {
        console.log('User info not found');
      }
    }
    fetchUserInfo();
    setCategoryOptions(options.categories);
  }, []);

  const handleImagePick = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'Take Photo', onPress: handleTakePhoto },
      { text: 'Choose from Gallery', onPress: handleChooseFromGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setShowLocationPicker(false); 
  };

  const handleTakePhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== 'granted') {
      alert('Camera access is required to take a photo.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const handleChooseFromGallery = async () => {
    const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryPermission.status !== 'granted') {
      alert('Media library access is required to choose a photo.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  

  const renderImage = () => {
    if (image) {
      console.log("Rendering image with URI:", image); 
      return (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      );
    }
    return null;
  };
  
  const clearImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    console.log('Submitting event...');
    setValidationMessage('');

    if (!title || title.length < 4 || title.length > 50) {
      setValidationMessage('Title must be between 4 and 50 characters.');
      return;
    }
    
    if (!description || description.length < 4 || description.length > 200) {
      setValidationMessage('Description must be between 4 and 200 characters.');
      return;
    }
    

    if (organizer && organizer.length > 50) {
      setValidationMessage('Organizer name must be less than 50 characters.');
      return;
    }

    if (!contactEmail || !validateEmail(contactEmail)) {
      setValidationMessage('Please enter a valid email address.');
      return;
    }

    const selectedCategory = options.categories.find(cat => cat.id === categoryId);
    if (!selectedCategory) {
      setValidationMessage('Invalid Selection! Please select a valid category.');
      return;
    }

    if (!createdBy) {
      setValidationMessage('Missing Information! Please fill in all required fields.');
      return;
    }

    try {
      let imageUrl = '';
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageName = `event_images/${Date.now()}`;
        const imageRef = ref(storage, imageName);
        const snapshot = await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const eventInfo = {
        title,
        description,
        image: imageUrl,
        dateTime: date ? Timestamp.fromMillis(date.getTime()) : null,
        locationCords: selectedLocation ? `${selectedLocation.latitude}, ${selectedLocation.longitude}` : null,
        locationDetails, 
        organizer,
        contactEmail,
        category: selectedCategory.name,
        submittedOn: Timestamp.now(),
        isEvent: true, 
        createdBy,
      };
      

      await addDoc(collection(firestore, 'events'), eventInfo);
      Alert.alert('Success', 'Event added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add the event.');
    }
  };

  const renderSelectedDate = () => {
    if (date) {
      return <Text style={styles.selectedText}>Selected Date: {date.toString()}</Text>;
    }
    return null;
  };

  const renderLocationSelector = () => {
    return (
    <View style={styles.actionContainer}>
      <Text style={styles.actionText} onPress={() => setShowLocationPicker(true)}>
        Select Location
      </Text>
      {selectedLocation && (
        <>
          <Text style={styles.locationText}>
            {`Latitude: ${selectedLocation.latitude.toFixed(5)}, Longitude: ${selectedLocation.longitude.toFixed(5)}`}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Location Details: e.g., Olmstead, Room number, etc (optional)"
            onChangeText={setLocationDetails}
            value={locationDetails}
            placeholderTextColor="#999"
          />
        </>
      )}
    </View>

    );
  };
  

  const renderSelectedCategory = () => {
    const selectedCategory = categoryId ? options.categories.find((cat) => cat.id === categoryId) : null;
    if (selectedCategory) {
      return <Text style={styles.selectedText}>Selected Event Category: {selectedCategory.name}</Text>;
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.inputMultiline}
        placeholder="Description"
        multiline
        onChangeText={setDescription}
        value={description}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer"
        onChangeText={setOrganizer}
        value={organizer}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Email"
        onChangeText={setContactEmail}
        value={contactEmail}
        placeholderTextColor="#999"
      />
      <View style={styles.actionContainer}>
        <Text style={styles.actionText} onPress={() => setShowDatePicker(true)}>
          Pick Date & Time
        </Text>
        {renderSelectedDate()}
        {renderLocationSelector()}
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
      <Modal
        visible={showLocationPicker}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <View style={styles.fullscreen}>
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={region}
            onRegionChangeComplete={newRegion => setRegion(newRegion)}
          >
        </MapView>
        <Image
          source={require('../../assets/marker.png')}
          style={styles.marker}
        />

          <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>
            {`Lat: ${region.latitude.toFixed(5)}, Lon: ${region.longitude.toFixed(5)}`}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowLocationPicker(false);
              setSelectedLocation({
                latitude: region.latitude,
                longitude: region.longitude,
              }); 
            }}
          >
            <Text style={styles.buttonText}>Confirm Selection</Text>
          </TouchableOpacity>

        </SafeAreaView>
        </View>
      </Modal>
      <View style={styles.actionContainer}>
        <Text style={styles.actionText} onPress={() => setShowCategoryPicker(true)}>
          Select Event Category
        </Text>
        {renderSelectedCategory()}
      </View>
      <Modal
        visible={showCategoryPicker}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCategoryPicker(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <FlatList
                data={categoryOptions}
                keyExtractor={(item) => item.id.toString()}
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
      <TouchableOpacity onPress={handleImagePick}>
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>Pick Image</Text>
        </View>
      </TouchableOpacity>
      {renderImage()}
      {image && (
        <TouchableOpacity style={styles.clearButton} onPress={clearImage}>
          <Text style={styles.clearButtonText}>Clear Image</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit Event</Text>
        </View>
        <View>
        {validationMessage !== '' && (
            <Text style={styles.validationMessage}>{validationMessage}</Text>
          )}
        </View>
        
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color: '#333',
  },
  validationMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    fontSize: 16, 
    backgroundColor: '#f9f9f9',
  },
  inputMultiline: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlign: 'auto',
    width: '100%',
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    width: '100%',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#007bff',
  },
  selectedText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: '#495057',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'lightgrey',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: '15%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    backgroundColor: '#aaa', 
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullscreen: {
    flex: 1,
  },
  marker: {
    height: 50, 
    width: 50,  
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25, 
    marginTop: -50, 
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  locationContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignSelf: 'center',
    marginVertical: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    marginTop: 5,
    marginBottom: 15, 
    borderRadius: 8,
    backgroundColor: '#f9f9f9', 
    textAlign: 'center',
  },
  region: {
    color: '#fff',
    paddingTop: 18,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#27ae60', 
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 30, 
    marginHorizontal: 50, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default AddNewEvent;