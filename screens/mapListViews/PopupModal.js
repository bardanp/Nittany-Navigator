import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import noPicturesIcon from '../../assets/no-pictures.png';
import { firestore } from '../../backend/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

  const headerTitle = modalData?.isEvent ? 'Event Info' : 'Report Info';
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
              <TouchableOpacity
                onPress={onClose}
                style={[styles.closeButton, { backgroundColor: headerBackgroundColor }]}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    width: '90%',
    maxWidth: 500,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  image: {
    width: '100%',
    height: '100%',
    
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 100,
    backgroundColor: '#4CAF50',
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  details: {
    fontSize: 14,
    marginBottom: 10,
  },
  emergency: {
    color: '#D32F2F',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#F44336',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default PopupModal;
