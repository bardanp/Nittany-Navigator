import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../../backend/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupModal from '../../mapListViews/PopupModal';

const UserEventsReports = () => {
    const navigation = useNavigation();
    const [eventsReports, setEventsReports] = useState([]);
    const [filter, setFilter] = useState('both');
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const fetchUserInfoAndData = async () => {
            try {
                const userInfoString = await AsyncStorage.getItem('userInfo');
                if (userInfoString) {
                    const userInfo = JSON.parse(userInfoString);
                    await fetchEventsAndReports(`${userInfo.firstName} ${userInfo.lastName.charAt(0)}.`);
                } else {
                    console.log('User info not found');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfoAndData();
    }, []);

    const fetchEventsAndReports = async (createdBy) => {
        try {
            const eventsQuery = query(collection(firestore, 'events'), where('createdBy', '==', createdBy));
            const reportsQuery = query(collection(firestore, 'reports'), where('createdBy', '==', createdBy));

            const [eventsSnapshot, reportsSnapshot] = await Promise.all([getDocs(eventsQuery), getDocs(reportsQuery)]);

            const fetchedEvents = eventsSnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                type: 'event',
            }));

            const fetchedReports = reportsSnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                type: 'report',
            }));

            setEventsReports([...fetchedEvents, ...fetchedReports]);
        } catch (error) {
            console.error('Error fetching events and reports:', error);
        }
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true); // This will show the modal
    };

    const handleRemoveItem = async (itemId, type) => {
        try {
            const collectionName = type === 'event' ? 'events' : 'reports';
            await deleteDoc(doc(firestore, collectionName, itemId));
            setEventsReports(prevItems => prevItems.filter(item => item.id !== itemId));
            setSelectedItem(null);
            alert('Item removed successfully')
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const filteredItems = eventsReports.filter(item =>
        filter === 'both' ||
        (filter === 'events' && item.type === 'event') ||
        (filter === 'reports' && item.type === 'report')
    );
    // Mock implementation of getIconName function
// Adjust this function according to your actual implementation
    const getIconName = (item) => {
    // Example logic: return icon name based on the item's type
    switch (item.type) {
        case 'event':
            return { icon: 'event', color: '#1976d2' };
        case 'report':
            return { icon: 'report-problem', color: '#d32f2f' };
        default:
            return { icon: 'info', color: '#9e9e9e' };
    }
};



    const renderItem = ({ item }) => {
        if (!item || !item.type) {
            console.error('Item or item.type is undefined', item);
            return null; // Return null or some placeholder component
          }

        const { icon, color } = getIconName(item);
    
        const handleMap = () => {
            const location = options.locations.find(loc => loc.name === item.location);
    
            if (location) {
                setMapRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
                setShowMap(true);
            } else {
                console.log('Location not found for:', item.location);
            }
        };
        

        return (
            <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress(item)}>
                <View style={styles.itemDetails}>
                    <Text style={styles.listItemHeader}>{item.title}</Text>
                    <Text style={styles.listItemText}>Location: {item.location}</Text>
                    <Text style={styles.listItemText}>Date: {item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id, item.type)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Your Events and Reports</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
                {['events', 'reports', 'both'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.filterButton,
                            filter === option && styles.filterButtonActive,
                        ]}
                        onPress={() => setFilter(option)}>
                        <Text style={[
                            styles.filterButtonText,
                            filter === option && styles.filterButtonTextActive,
                        ]}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderItem({ item })}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        paddingVertical: 10,
    },
    backButtonText: {
        color: '#5A67D8',
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: '#5A67D8',
    },
    filterButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#48BB78',
    },
    filterButtonTextActive: {
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: '#F4F6FA',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemDetails: {
        flex: 1,
    },
    listItemHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    listItemText: {
        color: '#6B7280',
        marginTop: 5,
    },
    removeButton: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    listContentContainer: {
        paddingBottom: 20,
    },
});

export default UserEventsReports;
