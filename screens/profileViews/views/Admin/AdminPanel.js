import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { firestore } from '../../../../backend/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminPanel = ({ navigation }) => {
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isEventReportModalVisible, setIsEventReportModalVisible] = useState(false);
    const [isAnalyticsModalVisible, setIsAnalyticsModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [eventsReports, setEventsReports] = useState([]);
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchEventsAndReports();
        fetchAnalytics();
    }, []);

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const fetchedUsers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsers(fetchedUsers);
    };

    const fetchEventsAndReports = async () => {
        const eventsSnapshot = await getDocs(collection(firestore, 'events'));
        const reportsSnapshot = await getDocs(collection(firestore, 'reports'));
        const fetchedEvents = eventsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            type: 'Event'
        }));
        const fetchedReports = reportsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            type: 'Report'
        }));
        setEventsReports([...fetchedEvents, ...fetchedReports]);
    };

    const fetchAnalytics = async () => {
        const analyticsSnapshot = await getDocs(collection(firestore, 'analytics'));
        const fetchedAnalytics = analyticsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAnalytics(fetchedAnalytics);
    };

    const handleUserManagement = () => {
        setIsUserModalVisible(true);
    };

    const handleEventsAndReportsManagement = () => {
        setIsEventReportModalVisible(true);
    };

    const handleAnalyticsManagement = () => {
        setIsAnalyticsModalVisible(true);
    };

    const handleDeleteUser = (userId) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this user?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(firestore, 'users', userId));
                            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                        } catch (error) {
                            console.error('Error deleting user:', error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const handleDeleteItem = (itemId, itemType) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            if (itemType === 'Event') {
                                await deleteDoc(doc(firestore, 'events', itemId));
                            } else if (itemType === 'Report') {
                                await deleteDoc(doc(firestore, 'reports', itemId));
                            }
                            setEventsReports(prevItems => prevItems.filter(item => item.id !== itemId));
                        } catch (error) {
                            console.error('Error deleting item:', error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Panel</Text>
            <TouchableOpacity onPress={handleUserManagement} style={styles.button}>
                <Text style={styles.buttonText}>User Management</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEventsAndReportsManagement} style={styles.button}>
                <Text style={styles.buttonText}>Events and Reports Management</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAnalyticsManagement} style={styles.button}>
                <Text style={styles.buttonText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {/* User Management Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isUserModalVisible}
                onRequestClose={() => setIsUserModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Manage Users</Text>
                    <FlatList
                        data={users}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <Text style={styles.itemText}>Email: {item.email}</Text>
                                <Text style={styles.itemText}>Name: {item.displayName}</Text>
                                <Text style={styles.itemText}>Campus: {item.campus}</Text>
                                <Text style={styles.itemText}>Type: {item.userType}</Text>
                                <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <TouchableOpacity onPress={() => setIsUserModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Events and Reports Management Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isEventReportModalVisible}
                onRequestClose={() => setIsEventReportModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Manage Events and Reports</Text>
                    <FlatList
                        data={eventsReports}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <Text style={styles.itemText}>Title: {item.title}</Text>
                                <Text style={styles.itemText}>Type: {item.type}</Text>
                                <Text style={styles.itemText}>Organizer: {item.organizer}</Text>
                                <Text style={styles.itemText}>Location: {item.locationDetails}</Text>
                                <TouchableOpacity onPress={() => handleDeleteItem(item.id, item.type)} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <TouchableOpacity onPress={() => setIsEventReportModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Analytics Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isAnalyticsModalVisible}
                onRequestClose={() => setIsAnalyticsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>View Analytics</Text>
                    <FlatList
                        data={analytics}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                {Object.entries(item).map(([key, value]) => (
                                    <Text key={key} style={styles.itemText}>{key}: {JSON.stringify(value)}</Text>
                                ))}
                            </View>
                        )}
                    />
                    <TouchableOpacity onPress={() => setIsAnalyticsModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    backButton: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    modalContainer: {
        marginTop: 80,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    listItemContainer: {
        backgroundColor: '#E8E8E8',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
    },
    itemText: {
        fontSize: 14,
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default AdminPanel;
