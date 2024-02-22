// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Linking, SafeAreaView, Platform, StatusBar } from 'react-native';
import { styles } from './ProfileScreenStyles'; // Import the external styles

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  // Modal controllers
  const toggleSettingsModal = () => setModalVisible(!modalVisible);
  const toggleAboutModal = () => setAboutModalVisible(!aboutModalVisible);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.userInfoSection}>
          <Text style={styles.usernameText}>Hello, User</Text>
        </View>

        <View style={styles.buttonsContainer}>
          {['Event History', 'Report History', 'Settings', 'About'].map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={button === 'Settings' ? toggleSettingsModal : button === 'About' ? toggleAboutModal : () => {}}
            >
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleSettingsModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeaderText}>Settings</Text>
              {/* Settings Options */}
              <TouchableOpacity style={styles.modalButton} onPress={() => {}}>
                <Text style={styles.modalButtonText}>Account Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={toggleSettingsModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* About Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={aboutModalVisible}
          onRequestClose={toggleAboutModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeaderText}>About</Text>
              {/* About Options */}
              <TouchableOpacity style={styles.modalButton} onPress={() => {}}>
                <Text style={styles.modalButtonText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={toggleAboutModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
