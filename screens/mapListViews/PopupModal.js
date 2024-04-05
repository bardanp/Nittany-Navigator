import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import noPicturesIcon from '../../assets/no-pictures.png';
import { firestore } from '../../backend/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { arrayRemove } from 'firebase/firestore';
import styles from './PopupModal.styles';
import { colors } from './PopupModal.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateDoc, arrayUnion } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import BookmarkButton from './BookmarkButton';
import CommentsSection from './CommentsSection';
import { StackView } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

const PopupModal = ({ visible, onClose, item }) => {
  const [modalData, setModalData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
    console.log("Modal visibility changed:", visible);
    console.log("PopupModal item prop:", item);

  }, [visible]);

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


  useEffect(() => {
    
    const fetchModalDataAndCheckSavedStatus = async () => {
      if (!item || !item.id) return;
  
      const documentId = item.id.split('-')[1];
        const documentRef = doc(firestore, item.type === 'event' ? 'events' : 'reports', item.id);
      
        try {
          const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          setModalData({ ...docSnap.data(), isEvent: item.isEvent });
          const userInfoString = await AsyncStorage.getItem('userInfo');
          if (userInfoString) {
            const { email } = JSON.parse(userInfoString);
            const userRef = doc(firestore, 'users', email);
            const userDoc = await getDoc(userRef);
  
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const fieldToCheck = item.isEvent ? 'savedEvents' : 'savedReports';
              const isCurrentlySaved = userData[fieldToCheck]?.includes(documentId);
  
              setIsSaved(isCurrentlySaved); 
            }
          }
        }
      } catch (error) {
        console.error('Error fetching modal data:', error);
      }
    };
    fetchModalDataAndCheckSavedStatus();
  }, [item]);


  

  const saveToUser = async (documentId, isEvent) => {
    if (!documentId) {
      console.error('documentId is undefined');
      return;
    }
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (!userInfoString) {
        console.error('User info not found');
        return;
      }
      const { email } = JSON.parse(userInfoString);
    
      const userRef = doc(firestore, 'users', email);
      const fieldToUpdate = isEvent ? 'savedEvents' : 'savedReports';
    
      await updateDoc(userRef, {
        [fieldToUpdate]: arrayUnion(item.id) 
      });
    
      console.log(`Saved ${isEvent ? 'event' : 'report'} with ID: ${item.id} to user ${email}`);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving to user:', error);
    }
  };

  const unsaveFromUser = async (isEvent) => {
    if (!item || !item.id) {
      console.error('Invalid item or item ID');
      return;
    }
  
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (!userInfoString) {
        console.error('User info not found');
        return;
      }
      const { email } = JSON.parse(userInfoString);
  
      const userRef = doc(firestore, 'users', email);
      const fieldToUpdate = isEvent ? 'savedEvents' : 'savedReports';
  
      await updateDoc(userRef, {
        [fieldToUpdate]: arrayRemove(item.id)
      });
  
      console.log(`Removed bookmark for ${isEvent ? 'event' : 'report'} with ID: ${item.id} from user ${email}`);
      setIsSaved(false);
    } catch (error) {
      console.error('Error removing bookmark from user:', error);
    }
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
        <View style={styles.modalContainer}>
        <View style={styles.header}>                
          <BookmarkButton
                  isSaved={isSaved}
                  onSave={() => saveToUser(item.id, item.isEvent)} 
                  onUnsave={() => unsaveFromUser(item.id, item.isEvent)} 
                />
                          <Text style={styles.category}>{modalData.title}</Text>
              <Pressable onPress={onClose} style={styles.closeIconContainer}>
                <Ionicons name="close" size={28} color={colors.closeIcon} />
              </Pressable>
              </View>

              <View style={styles.imageContainer}>
              <Image
                source={{ uri: modalData.image || noPicturesIcon }}
                style={styles.image}
                resizeMode='cover'
                onError={() => setImageError(true)}
              />
              </View>

              <View style={styles.body}>
              <Text style={styles.description}>{modalData.description}</Text>
              <Text style={styles.details}>{`Date: ${formatDate(modalData.dateTime)}`}</Text>
              <Text style={styles.details}>{`Location: ${modalData.location || 'N/A'}`}</Text>
              <Text style={styles.details}>{`Category: ${modalData.category || 'N/A'}`}</Text>
              <Text style={styles.details}>{`Organizer: ${modalData.organizer || 'N/A'}`}</Text>
              <Text style={styles.details}>{`Contact: ${modalData.contactEmail || 'N/A'}`}</Text>
              <Text style={styles.details}>{`RSVP Count: ${modalData.RSVP || 0}`}</Text>
              <Text style={styles.details}>{`Created by: ${modalData.createdBy || 'Unknown'}`}</Text>
              {modalData.isEvent === false && modalData.emergency && (
                <Text style={styles.emergency}>EMERGENCY</Text>
              )}
            </View>
            <CommentsSection itemId={item.id} />
          </View>
        </View>
      )}
    </Modal>
  );
};

export default PopupModal;

