import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../../backend/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupModal from '../../mapListViews/detailsView/PopupModal';


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
        if (!item || typeof item.id !== 'string') {
            console.error('Invalid item passed to PopupModal', item);
            return;
        }
        setSelectedItem(item);
        setModalVisible(true); 
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



    const renderItem = ({ item }) => {
        if (!item || !item.type) {
            console.error('Item or item.type is undefined', item);
            return null; 
        }

        return (
            <View style={styles.listItem}>
                <View style={styles.itemDetails}>
                    <Text style={styles.listItemHeader}>{item.title}</Text>
                    <Text style={styles.listItemText}>Location: {item.location}</Text>
                    <Text style={styles.listItemText}>Date: {item.date}</Text>
                </View>
                <View style={styles.listItemActions}>
                    <TouchableOpacity onPress={() => handleRemoveItem(item.id, item.type)} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Delete {item.type}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.viewInfo}>
                        <Text style={styles.viewInfoText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
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

            <PopupModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                item={selectedItem}
            />
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');
const scale = size => (width / 428) * size;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingTop: scale(20),
        paddingBottom: scale(10),
    },
    header: {
        fontSize: scale(24),
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        paddingVertical: scale(10),
    },
    backButtonText: {
        color: '#5A67D8',
        fontSize: scale(16),
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: scale(20),
        paddingHorizontal: scale(20),
    },
    filterButton: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(20),
        borderRadius: scale(8),
        backgroundColor: '#5A67D8',
    },
    filterButtonText: {
        color: '#FFFFFF',
        fontSize: scale(16),
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
        padding: scale(20),
        borderRadius: scale(8),
        marginBottom: scale(20),
        marginHorizontal: scale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemDetails: {
        flex: 1,
    },
    listItemHeader: {
        fontSize: scale(18),
        fontWeight: '600',
        color: '#333',
    },
    listItemText: {
        color: '#6B7280',
        marginTop: scale(5),
    },
    removeButton: {
        backgroundColor: '#FF3B30',
        padding: scale(10),
        borderRadius: scale(8),
        margin: scale(4),
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: scale(14),
    },
    listContentContainer: {
        paddingBottom: scale(20),
    },
    viewInfo: {
        backgroundColor: '#007bff',
        padding: scale(10),
        borderRadius: scale(8),
        margin: scale(4),
    },
    viewInfoText: {
        color: '#FFFFFF',
        fontSize: scale(14),
    },
});

export default UserEventsReports;
