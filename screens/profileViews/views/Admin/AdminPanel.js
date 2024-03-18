import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminPanel = ({ navigation }) => {

    // Placeholder functions for admin actions
    const handleUserManagement = () => {
        console.log('Navigating to User Management...');
        // navigation.navigate('UserManagement');
    };

    const handleContentModeration = () => {
        console.log('Navigating to Content Moderation...');
        // navigation.navigate('ContentModeration');
    };

    const handleViewAnalytics = () => {
        console.log('Navigating to View Analytics...');
        // navigation.navigate('ViewAnalytics');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Panel</Text>
            <TouchableOpacity onPress={handleUserManagement} style={styles.button}>
                <Text style={styles.buttonText}>User Management</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContentModeration} style={styles.button}>
                <Text style={styles.buttonText}>Content Moderation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewAnalytics} style={styles.button}>
                <Text style={styles.buttonText}>View Analytics</Text>
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
