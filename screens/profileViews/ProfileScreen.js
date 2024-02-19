import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'; 

function ProfileScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.headerText}>Hello Siri</Text>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesomeIcon icon={faGear} style={{color: "#002d62"}} />
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
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'flex-start', 
        alignItems: 'center',
        flex: 1,
        paddingTop: 60, 
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, 
    },
    settingsButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    modalView: {
        marginTop: 22,
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    modalHeaderText: {
        fontSize: 24,
        marginBottom: 20, 
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#ddd',
        padding: 10,
    },
});

export default ProfileScreen;
