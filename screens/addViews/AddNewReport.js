import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert, Image, Modal, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../../backend/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import options from '../../backend/options.json';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const AddNewReport = () => {
 const [title, setTitle] = useState('');
 const [emergency, setEmergency] = useState(false);
 const [description, setDescription] = useState('');
 const [image, setImage] = useState(null);
 const [date, setDate] = useState(null);
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [location, setLocation] = useState('');
 const [showLocationPicker, setShowLocationPicker] = useState(false);
 const [category, setCategory] = useState('');
 const [showCategoryPicker, setShowCategoryPicker] = useState(false);
 const navigation = useNavigation();

 const handleImagePick = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

   if (!result.canceled) {
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
       location,
       category,
     });
     Alert.alert("Success", "Report added successfully!");
     navigation.goBack();
   } catch (error) {
     console.error('Error adding report to Firestore:', error);
     Alert.alert("Error", "Failed to add the report.");
   }
 };

 return (
   <ScrollView style={styles.container}>
     <Text style={styles.header}>Add New Report</Text>
     <TextInput
       style={styles.input}
       placeholder="Title"
       onChangeText={setTitle}
       value={title}
     />
     <View style={styles.switchContainer}>
       <Text>Emergency:</Text>
       <Switch
         onValueChange={setEmergency}
         value={emergency}
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
     <TouchableOpacity onPress={handleImagePick} style={styles.button}>
       <Text>Pick Image (Optional)</Text>
     </TouchableOpacity>
     {image && <Image source={{ uri: image }} style={styles.image} />}
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
     <TouchableOpacity onPress={() => setShowCategoryPicker(true)} style={styles.button}>
       <Text>Select Category</Text>
     </TouchableOpacity>
     <Modal
       visible={showCategoryPicker}
       animationType="slide"
       transparent={true}
       onRequestClose={() => setShowCategoryPicker(false)}>
       <View style={styles.modalView}>
         <Picker
           selectedValue={category}
           onValueChange={(itemValue) => {
             setCategory(itemValue);
             setShowCategoryPicker(false);
           }}
           style={styles.picker}>
           {options.categories.map((category) => (
             <Picker.Item key={category.id} label={category.name} value={category.name} />
           ))}
         </Picker>
         <TouchableOpacity onPress={() => setShowCategoryPicker(false)} style={styles.modalButton}>
           <Text style={styles.modalButtonText}>Done</Text>
         </TouchableOpacity>
       </View>
     </Modal>
     {category && (
       <Text>Selected Category: {category}</Text>
     )}
     <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
       <Text>Submit Report</Text>
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
 switchContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 20,
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
 image: {
   width: '100%',
   height: 200,
   borderRadius: 5,
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

export default AddNewReport;