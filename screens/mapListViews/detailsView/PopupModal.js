import React, { useState, useEffect } from 'react';
import { Modal, Alert, TouchableOpacity, View, Text, Pressable, ScrollView, Image, Dimensions, Linking } from 'react-native';
import noPicturesIcon from '../../../assets/no-pictures.png';
import { firestore } from '../../../backend/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { arrayRemove } from 'firebase/firestore';
import styles from './PopupModal.styles';
import { colors } from './PopupModal.styles';
import { updateDoc, arrayUnion } from 'firebase/firestore';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import BookmarkButton from './BookmarkButton';
import CommentsSection from './CommentsSection';
import { Platform } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';



const PopupModal = ({ visible, onClose, item }) => {
  const [modalData, setModalData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTab, setSelectedTab] = useState('details');

  useEffect(() => {
    setModalData(item);
  }, [item]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openDirections = (modalData) => {
    const { title, locationCords } = modalData;
    let latitude, longitude;
    if (locationCords && typeof locationCords === 'string') {
      [latitude, longitude] = locationCords.split(',').map(coord => parseFloat(coord.trim()));
    }
  
    if (!latitude || !longitude) {
      console.error("Invalid location coordinates:", { latitude, longitude });
      Alert.alert("Location Error", "Invalid location coordinates.");
      return;
    }
  
    const encodedLabel = encodeURIComponent(title); 
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${encodedLabel}@${latLng}`,
      android: `${scheme}${latLng}(${encodedLabel})`,
    });
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI:", url);
          Alert.alert("Error", "Unable to open maps.");
        }
      })
      .catch((err) => {
        console.error("An error occurred", err);
        Alert.alert("Error", "An unexpected error occurred.");
      });
  };





  useEffect(() => {
    const fetchModalDataAndCheckSavedStatus = async () => {
      if (!item || !item.id) return;

      // Check if RNCalendarEvents is available
      if (RNCalendarEvents) {
        const authStatus = await RNCalendarEvents.checkPermissions();
        if (authStatus !== 'authorized') {
          await RNCalendarEvents.requestPermissions();
        }
      } else {
        console.error("RNCalendarEvents is not available");
      }

      const documentRef = doc(firestore, item.type === 'event' ? 'events' : 'reports', item.id);
      try {
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          setModalData({...docSnap.data(), isEvent: item.isEvent});
        }
      } catch (error) {
        console.error('Error fetching modal data:', error);
      }
    };
    fetchModalDataAndCheckSavedStatus();
  }, [item]);

  const addEventToCalendar = async () => {
    if (!modalData) return;

    const { title, dateTime, locationDetails } = modalData;
    const startDate = new Date(dateTime.seconds * 1000);
    const endDate = new Date(startDate.getTime() + 2 * 3600 * 1000); // Assuming event lasts 2 hours

    try {
      if (RNCalendarEvents) {
        const eventId = await RNCalendarEvents.saveEvent(title, {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          location: locationDetails,
          notes: 'Added from App',
        });

        console.log(`Event created with ID: ${eventId}`);
        Alert.alert("Success", "Event added to calendar");
      } else {
        console.error("RNCalendarEvents is not available");
      }
    } catch (error) {
      console.error("Error adding event to calendar:", error);
      Alert.alert("Error", "Could not add event to calendar");
    }
  };




  const onBookmarkChange = async (email, itemId, isEvent, action) => {
    const userRef = doc(firestore, 'users', email);
    const updateAction = action === 'add' ? arrayUnion : arrayRemove;
    await updateDoc(userRef, {
      [isEvent ? 'savedEvents' : 'savedReports']: updateAction(itemId),
    });
  };

  return (
      <Modal
          visible={visible}
          onRequestClose={onClose}
          transparent
          animationType="fade"
      >
        {modalData && (
          <View style={styles.modalOverlay}>
              <View style={styles.buttonContainer}>
                <BookmarkButton
                    itemId={item.id}
                    isEvent={item.isEvent}
                    onBookmarkChange={onBookmarkChange}
                />

                <Pressable onPress={addEventToCalendar} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Add to Calendar</Text>
                </Pressable>


                <TouchableOpacity
                    onPress={() => openDirections(modalData)}
                    style={styles.directionsButton}
                >
                  <FontAwesome name="map-marker" size={40} color={colors.white} />
                </TouchableOpacity>


                <Pressable onPress={onClose} style={styles.closeIconContainer}>
                  <Ionicons name="close" size={28} color={colors.closeIcon}/>
                </Pressable>
              </View>
              <View style={styles.tabContainer}>
              
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'details' && styles.activeTab]}
                    onPress={() => setSelectedTab('details')}
                >
                  <Text style={styles.tabText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'comments' && styles.activeTab]}
                    onPress={() => setSelectedTab('comments')}
                >
                  <Text style={styles.tabText}>Comments</Text>
                </TouchableOpacity>
              </View>

              {selectedTab === 'details' ? (
                    <View style={styles.modalContainer}>
                      <ScrollView style={styles.scrollViewContainer}></ScrollView>
                      <View style={styles.header}>
                        <Text style={styles.title}>{modalData.title}</Text>
                      </View>
                      <View style={styles.imageContainer}>
                        <Image
                            source={modalData.image ? {uri: modalData.image} : noPicturesIcon}
                            style={styles.image}
                            resizeMode='cover'
                            onError={() => setImageError(true)}
                        />
                      </View>

                      <View style={styles.body}>
                        <Text style={styles.description}>{modalData.description}</Text>
                        <Text style={styles.details}>{`Date: ${formatDate(modalData.dateTime)}`}</Text>
                        <Text style={styles.details}>{`Location: ${modalData.locationDetails || 'N/A'}`}</Text>
                        <Text style={styles.details}>{`Category: ${modalData.category || 'N/A'}`}</Text>
                        <Text style={styles.details}>{`Organizer: ${modalData.organizer || 'N/A'}`}</Text>
                        <Text style={styles.details}>{`Contact: ${modalData.contactEmail || 'N/A'}`}</Text>
                        <Text style={styles.details}>{`Created by: ${modalData.createdBy || 'Unknown'}`}</Text>
                      </View>
                    </View>

              ) : (
                  <CommentsSection itemId={item.id}/>
              )}
            </View>
        )}
      </Modal>
  );
};

export default PopupModal;

