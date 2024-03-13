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
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        setModalData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    fetchModalData();
  }, [item]);

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return 'N/A';
    }
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  

  const isReport = true; 
  const headerBackgroundColor = isReport ? '#F44336' : '#4CAF50'; 
  const textColor = '#333';

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
              <Text style={styles.category}>{'Report Info'}</Text>
            </View>
            {modalData?.image ? (
              <Image
                source={{ uri: modalData.image }}
                style={styles.image}
                resizeMode='stretch'
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                source={noPicturesIcon}
                style={styles.image}
                resizeMode="contain"
              />
            )}

            <View style={styles.body}>
              <Text style={[styles.title, { color: textColor }]}>{modalData?.title}</Text>
              <Text style={[styles.description, { color: textColor }]}>{modalData?.description}</Text>
              <Text style={[styles.details, { color: textColor }]}>
                {`Date: ${modalData?.dateTime ? formatDate(modalData.dateTime) : 'N/A'}`}
              </Text>
              <Text style={[styles.details, { color: textColor }]}>
                {`Location: ${modalData?.location}`}
              </Text>
              <Text style={[styles.details, { color: textColor }]}>
                {`Category: ${modalData?.category}`}
              </Text>
              {modalData?.emergency && (
                <Text style={[styles.emergency, { color: textColor }]}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    width: width - 50,
    maxWidth: 500,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderColor: 'grey',
    borderBottomWidth: 10,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  category: {
    fontSize: 20,
    padding: 5,
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
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
  emergency: {
    color: '#D32F2F',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  closeButton: {
    padding: 0,
    borderWidth: 5,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PopupModal;
