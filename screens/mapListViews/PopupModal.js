import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import noPicturesIcon from '../../assets/no-pictures.png';
import { firestore } from '../../backend/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles, { colors } from './PopupModal.styles';

const { width } = Dimensions.get('window');

const PopupModal = ({ visible, onClose, item }) => {
  const [modalData, setModalData] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchModalData = async () => {
      if (!item) return;

      const documentId = item.id.split('-')[1];
      const documentRef = doc(firestore, item.isEvent ? 'events' : 'reports', documentId);

      try {
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          setModalData({ ...docSnap.data(), isEvent: item.isEvent });
        }
      } catch (error) {
        console.error('Error fetching modal data:', error);
      }
    };
    fetchModalData();
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
                <Text style={styles.category}>{headerTitle}</Text>
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
                <Text style={styles.title}>{modalData?.title}</Text>
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