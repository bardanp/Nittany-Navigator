import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { fetchDummyEvent, fetchDummyReport, testSubmitEvent } from '../../../../Tests/Bardan';

import PopupModal from '../../../mapListViews/PopupModal'

const AdminPanel = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState(null);


    const testMaliha = () => {
        console.log('Running Malihas Test...');
    };

    const testSiri = () => {
        console.log('Running Siris Test...');
    };

    const testVy = () => {
        console.log('Running Vys Test...');
    };

    const submitEventTest = async () => {
        try {
            await testSubmitEvent();
        } catch (error) {
            console.error('Bardan Test failed:', error);
        }
    };

    const openEventInfoTest = async () => {
        const event = await fetchDummyEvent();
        console.log('Event Info Test:', event);
        setModalItem(event);
        setModalVisible(true);
        Alert.alert('Event Info Test', 'Event data fetched successfully,\nCheck console for details.');
    };

    const openReportInfoTest = async () => {
        const report = await fetchDummyReport();
        console.log('Report Info Test:', report);
        setModalItem(report);
        setModalVisible(true);
        Alert.alert('Report Info Test', 'Report data fetched successfully,\nCheck console for details.');
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Panel</Text>
            <TouchableOpacity onPress={submitEventTest} style={styles.button}>
                <Text style={styles.buttonText}>Run Bardan Test 'submitEvent'</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openEventInfoTest} style={styles.button}>
                <Text style={styles.buttonText}>Run Bardan Test 'openEventInfo'</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openReportInfoTest} style={styles.button}>
                <Text style={styles.buttonText}>Run Bardan Test 'openReportInfo'</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={testMaliha} style={styles.button}>
                <Text style={styles.buttonText}>Run Maliha Test</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testSiri} style={styles.button}>
                <Text style={styles.buttonText}>Run Siri Test</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testVy} style={styles.button}>
                <Text style={styles.buttonText}>Run Vy Test</Text>
            </TouchableOpacity>
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
        borderRadius: 25, 
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
