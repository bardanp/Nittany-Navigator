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

const { width } = Dimensions.get('window');

const PopupModal = ({ visible, onClose, item }) => {
  const [modalData, setModalData] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
    console.log("Modal visibility changed:", visible);
  }, [visible]);
  

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
  

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
  

  const headerTitle = modalData?.isEvent ? 'Event' : 'Report';
  const headerBackgroundColor = modalData?.isEvent ? '#4CAF50' : '#F44336';

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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContainer}
            >
              <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
                <Text style={styles.category}>{modalData?.title}</Text>
                
                <BookmarkButton
                  isSaved={isSaved}
                  onSave={() => saveToUser(item.id, item.isEvent)} 
                  onUnsave={() => unsaveFromUser(item.id, item.isEvent)} 
                />

              </View>

              <View style={styles.imageContainer}>
                {modalData?.image && !imageError ? (
                  <Image
                    source={{ uri: modalData.image }}
                    style={styles.image}
                    resizeMode='cover'
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <Image
                    source={noPicturesIcon}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.body}>
                <Text style={styles.description}>{modalData?.description}</Text>
                <Text style={styles.details}>
                  {`Date: ${formatDate(modalData.dateTime)}`}
                </Text>
                <Text style={styles.details}>
                  {`Location: ${modalData?.location || 'N/A'}`}
                </Text>
                <Text style={styles.details}>
                  {`Category: ${modalData?.category || 'N/A'}`}
                </Text>
                <Text style={styles.details}>
                  {`Created by: ${modalData?.createdBy || 'Unknown'}`}
                </Text>
                {modalData?.isEvent === false && modalData?.emergency && (
                  <Text style={styles.emergency}>
                    EMERGENCY
                  </Text>
                )}
              </View>
              
              <View style={styles.commentContainer}>
                <Text style={styles.comments}>
                  [Comments will be go here]
                </Text>
                {modalData.comments && modalData.comments.map((comment, index) => (
                  <Text key={index} style={styles.commentText}>{comment}</Text>
                ))}
              </View>


              <Pressable
                onPress={onClose}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '5071c4' : '5E81F4',
                  },
                  styles.closeButton,
                ]}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default PopupModal;
