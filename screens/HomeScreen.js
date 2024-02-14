import React, {useState} from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import MapView from 'react-native-maps';

// // Harcoded events, but will be in firebase after setup
const events = [
    { id: '1', title: 'Event 1', description: 'Event 1 Description'},
    { id: '2', title: 'Event 2', description: 'Event 2 Description', latitude: 0, longitude: 0 },
    { id: '3', title: 'Event 3', description: 'Event 3 Description', latitude: 0, longitude: 0 },
    { id: '4', title: 'Event 4', description: 'Event 4 Description', latitude: 0, longitude: 0 },
    { id: '5', title: 'Event 5', description: 'Event 5 Description', latitude: 0, longitude: 0 },
    { id: '6', title: 'Event 6', description: 'Event 6 Description', latitude: 0, longitude: 0 },
    { id: '7', title: 'Event 7', description: 'Event 7 Description', latitude: 0, longitude: 0 },

];

const handleDesc = (description) => {
    alert('Description: ' + description);
};

const handleMap = (latitude, longitude) => {
    if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined) {
        alert(`Latitude: ${latitude} Longitude: ${longitude}`);
    } else {
        alert('Location not available for this event.');
    }
};

const HomeScreen = () => {
    const [viewMode, setViewMode] = useState('list'); // Initial view mode

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                >
                    <Text style={styles.toggleButtonText}>{viewMode === 'list' ? 'Show Map' : 'Show List'}</Text>
                </TouchableOpacity>
            </View>
            {viewMode === 'list' ? (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => handleMap(item.latitude, item.longitude)} style={styles.button}>
                                    <Icon name="map" size={20} color="#2ecc71" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDesc(item.description)} style={styles.button}>
                                    <Icon name="info" size={20} color="#007bff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={{
                        latitude: 40.2025,
                        longitude: -76.9783,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    toggleContainer: {
        zIndex: 1, // Ensure the button is always on top
        position: 'absolute', // Position over the list or map view
        right: 10,
        top: 10,
    },
    toggleButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 20,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    eventItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleButton: {
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 20,
    },
    toggleButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default HomeScreen;
