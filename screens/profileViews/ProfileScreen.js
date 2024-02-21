import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    usernameText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
        width: '70%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeaderText: {
        fontSize: 24,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#ddd',
        padding: 10,
        marginTop: 20,
    },
    settingsButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 15,
    },
});

const ProfileScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [selectedAboutOption, setSelectedAboutOption] = useState('');

    const handleEventHistory = () => {
  
    };

    const handleReportHistory = () => {
        
    };

    const handleDeleteAccount = () => {
       
    };

    const handleLogOut = () => {
   
    };

    const handleSupport = () => {
        Linking.openURL('mailto:support@gmail.com');
    };

    const handleAbout = () => {
        setAboutModalVisible(true);
    };

    const handleAboutOption = (option) => {
        setSelectedAboutOption(option);
        
        switch (option) {
            case 'About Account':
               
                break;
            case 'Terms of Service':
             
                break;
            case 'Privacy Policy':
            
                break;
            default:
                break;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.usernameText}>Hello, User</Text>
            
            <TouchableOpacity
                style={styles.button}
                onPress={handleEventHistory}
            >
                <Text style={styles.buttonText}>Event History</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleReportHistory}
            >
                <Text style={styles.buttonText}>Report History</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.button}
                onPress={handleAbout}
            >
                <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
            
         
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalHeaderText}>Settings</Text>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={handleAbout}
                    >
                        <Text style={styles.buttonText}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSupport}
                    >
                        <Text style={styles.buttonText}>Support</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleDeleteAccount}
                    >
                        <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogOut}
                    >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                   
                    
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

          
            <Modal
                animationType="slide"
                transparent={false}
                visible={aboutModalVisible}
                onRequestClose={() => {
                    setAboutModalVisible(false);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalHeaderText}>About</Text>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleAboutOption('About Account')}
                    >
                        <Text style={styles.buttonText}>About Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleAboutOption('Terms of Service')}
                    >
                        <Text style={styles.buttonText}>Terms of Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleAboutOption('Privacy Policy')}
                    >
                        <Text style={styles.buttonText}>Privacy Policy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setAboutModalVisible(false);
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default ProfileScreen;