import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventHistory = () => {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Event History</Text>
            <Text>This page displays all of the Events from the user</Text>
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
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
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

export default EventHistory;
