import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View, Text, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import noPicturesIcon from '../../../assets/no-pictures.png';
import { firestore } from '../../../backend/firebase';
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


  useEffect(() => {
    const fetchModalDataAndCheckSavedStatus = async () => {
      if (!item || !item.id) return;

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
              {/* Tab navigation */}
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
                  <ScrollView style={{flex: 1}}>
                    <View style={styles.modalContainer}>
                      <View style={styles.header}>
                        <BookmarkButton
                            itemId={item.id}
                            isEvent={item.isEvent}
                            onBookmarkChange={onBookmarkChange}
                        />
                        <Text style={styles.title}>{modalData.title}</Text>
                        <Pressable onPress={onClose} style={styles.closeIconContainer}>
                          <Ionicons name="close" size={28} color={colors.closeIcon}/>
                        </Pressable>
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
                        <Text style={styles.details}>{`RSVP Count: ${modalData.RSVP || 0}`}</Text>
                        <Text style={styles.details}>{`Created by: ${modalData.createdBy || 'Unknown'}`}</Text>
                        {modalData.isEvent === false && modalData.emergency && (
                            <Text style={styles.emergency}>EMERGENCY</Text>
                        )}
                      </View>
                    </View>
                  </ScrollView>
              ) : (
                  <CommentsSection itemId={item.id}/>
              )}
            </View>
        )}
      </Modal>
  );
};

export default PopupModal;

