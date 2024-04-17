import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import noPicturesIcon from '../../assets/no-pictures.png';

const MultipleEventsModal = ({ isLocationModalVisible, setIsLocationModalVisible, locationItems, setSelectedItem, setModalVisible, getIconName, listData, renderItem }) => {
    return (
        <Modal
            visible={isLocationModalVisible}
            onRequestClose={() => setIsLocationModalVisible(false)}
            transparent={true}
            animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.header}>Events/Reports</Text>
                    <FlatList
                        data={locationItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            const { icon, color } = getIconName(item);
                            return (
                                <View style={styles.listItem}>
                                    <Icon name={icon} size={24} color={color} />
                                    <View style={styles.itemTextContainer}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.details}>{`Location: ${item.location}`}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.listItemButton}
                                        onPress={() => {
                                            setSelectedItem(item);
                                            setModalVisible(true);
                                            setIsLocationModalVisible(false);
                                        }}>
                                        <Text style={styles.listItemButtonText}>View Details</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsLocationModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        width: '90%',
        padding: 10,
        maxWidth: 500,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 14,
        color: '#777',
    },
    listItemButton: {
        padding: 8,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    listItemButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MultipleEventsModal;
