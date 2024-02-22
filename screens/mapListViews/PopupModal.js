// PopupModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PopupModal = ({ visible, onClose, item }) => {
  if (!item) return null; // If no item is provided, do not render anything

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{item.title}</Text>
          <Text style={styles.modalText}>Location: {item.location}</Text>
          <Text style={styles.modalText}>Created By: {item.createdBy}</Text>
          {item.description && <Text style={styles.modalText}>Description: {item.description}</Text>}
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PopupModal;
