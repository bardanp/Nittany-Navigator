import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const AdminPanel = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Panel</Text>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <PopupModal visible={isModalVisible} onClose={() => setModalVisible(false)} item={modalItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', 
        paddingVertical: 20, 
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        borderRadius: 8, 
        marginVertical: 8, 
        minWidth: '60%',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500', 
    },
    backButton: {
        backgroundColor: '#FF6347', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});


export default AdminPanel;
