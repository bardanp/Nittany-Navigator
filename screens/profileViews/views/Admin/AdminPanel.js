import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { testSubmitEvent } from '../../../../Tests/Bardan' // Make sure this path is correct

const AdminPanel = ({ navigation }) => {
    const testMaliha = () => {
        console.log('Running Malihas Test...');
        // Additional logic for Maliha's test
    };

    const testSiri = () => {
        console.log('Running Siris Test...');
        // Additional logic for Siri's test
    };

    const testVy = () => {
        console.log('Running Vys Test...');
        // Additional logic for Vy's test
    };

    // Defined function for running Bardan's test
    const testBardan = async () => {
        try {
            await testSubmitEvent();
            console.log('Bardan Test completed successfully.');
            Alert.alert('Success', 'Bardan Test completed successfully.');
        } catch (error) {
            console.error('Bardan Test failed:', error);
            Alert.alert('Error', 'Bardan Test failed. Check console for details.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Panel</Text>
            <TouchableOpacity onPress={testBardan} style={styles.button}>
                <Text style={styles.buttonText}>Run Bardan Test</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={testMaliha} style={styles.button}>
                <Text style={styles.buttonText}>Maliha Test</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testSiri} style={styles.button}>
                <Text style={styles.buttonText}>Siri Test</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testVy} style={styles.button}>
                <Text style={styles.buttonText}>Vy Test</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 22,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#007AFF',
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default AdminPanel;
