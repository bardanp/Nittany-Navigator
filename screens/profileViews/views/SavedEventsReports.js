import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../../backend/firebase';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupModal from '../../mapListViews/PopupModal';

const SavedEventsReports = () => {
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
                    const { email } = JSON.parse(userInfoString);
                    const userRef = doc(firestore, 'users', email);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        fetchSavedItems(userData.savedItems || []);
                    }
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfoAndData();
    }, []);


    const fetchSavedItems = async (savedItemsIds) => {
        const itemsData = await Promise.all(savedItemsIds.map(async (itemId) => {
            const isEvent = itemId.startsWith('E'); // Assuming event IDs start with 'E', adjust as needed
            const collection = isEvent ? 'events' : 'reports';
            const itemRef = doc(firestore, collection, itemId);
            const itemSnap = await getDoc(itemRef);
            if (itemSnap.exists()) {
                return { ...itemSnap.data(), id: itemSnap.id, type: isEvent ? 'event' : 'report' };
            }
            return null;
        }));
        
        setEventsReports(itemsData.filter(Boolean)); 
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };


    const unsaveFromUser = async (documentId, isEvent) => {
        try {
            const userInfoString = await AsyncStorage.getItem('userInfo');
            if (!userInfoString) {
                console.error('User info not found');
                return;
            }
            const { email } = JSON.parse(userInfoString);
    
            const userRef = doc(firestore, 'users', email);
            const fieldToUpdate = isEvent ? 'savedEvents' : 'savedReports';
    
            await updateDoc(userRef, {
                [fieldToUpdate]: arrayRemove(documentId)
            });
    
            console.log(`Removed bookmark for ${isEvent ? 'event' : 'report'} with ID: ${documentId} from user ${email}`);
            
            await fetchSavedEventsAndReports(email);
        } catch (error) {
            console.error('Error removing bookmark from user:', error);
        }
    };
    

    const handleRemoveBookmark = async (documentId, isEvent) => {
        const item = { id: documentId, isEvent };
    
        Alert.alert(
            'Remove Bookmark',
            'Are you sure you want to remove this bookmark?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: async () => {
                        await unsaveFromUser(documentId, isEvent);
                        console.log('Bookmark removed:', documentId);
                    },
                    
                },
            ],
            { cancelable: true }
        );
    };


    const filteredItems = eventsReports.filter(item =>
        filter === 'both' ||
        (filter === 'events' && item.type === 'event') ||
        (filter === 'reports' && item.type === 'report')
    );
    const getIconName = (item) => {
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
        console.error('Item or item type is undefined', item);
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
                <TouchableOpacity
                    onPress={() => handleRemoveBookmark(item.id, item.type === 'event')}
                    style={styles.removeButton}
                >
                    <Text style={styles.removeButtonText}>Remove Bookmark</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    style={styles.viewInfo}
                >
                    <Text style={styles.viewInfoText}>View Details</Text>
                </TouchableOpacity>
            </View>
            <PopupModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                item={selectedItem}
                />
        </View>
    );
};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Saved Events and Reports</Text>
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
    viewInfo: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        margin: 4,
    },
    viewInfoText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});

export default SavedEventsReports;
