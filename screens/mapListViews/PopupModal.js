import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

import noPicturesIcon from '../../assets/no-pictures.png';

const { width } = Dimensions.get('window');

const PopupModal = ({ visible, onClose, item }) => {
  if (!item) return null;

  const [imageError, setImageError] = useState(false);

  const formatDate = timestamp => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US");
  };

  const isEvent = !!item.event_id;
  const headerBackgroundColor = isEvent ? '#4CAF50' : '#F44336'; 
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
              <Text style={styles.category}>{isEvent ? 'Event Info' : 'Report Info'}</Text>
            </View>
            {item.imageurl && !imageError ? (
              <Image
                source={{ uri: item.imageurl }}
                style={styles.image}
                resizeMode="contain"
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
              <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
              <Text style={[styles.description, { color: textColor }]}>{item.desc}</Text>
              <Text style={[styles.details, { color: textColor }]}>
                {`Date: ${formatDate(item.timestamp)}`}
              </Text>
              <Text style={[styles.details, { color: textColor }]}>
                {`Location: ${item.location}`}
              </Text>
              <Text style={[styles.details, { color: textColor }]}>
                {`Created by: ${item.createdBy}`}
              </Text>
              {item.emergency && (
                <Text style={[styles.emergency, styles.details]}>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    padding: 10,
    borderWidth: 5,
    borderColor: 'blue',
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PopupModal;
