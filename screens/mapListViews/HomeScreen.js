import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, TouchableOpacity, Text, Image, FlatList, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './HomeScreen.styles.js';
import * as Location from 'expo-location';
import { firestore } from '../../backend/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import options from '../../backend/options.json';
import MultipleEventsModal from './MultipleEventsModal.js';
import PopupModal from "./detailsView/PopupModal";

const HomeScreen = () => {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [listData, setListData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
    const [locationItems, setLocationItems] = useState([]);

    const [showMap, setShowMap] = useState(true);
    const [mapRegion, setMapRegion] = useState({
        latitude: 40.204444839295846,
        longitude: -76.74518002144552,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    });

    const pennStateCoords = {
        latitude: 40.204444839295846,
        longitude: -76.74518002144552,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    };

    const toggleView = () => {
        setShowMap(!showMap);
    };

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const eventsCollectionRef = collection(firestore, 'events');
                const reportsCollectionRef = collection(firestore, 'reports');
    
                const eventsSnapshot = await getDocs(eventsCollectionRef);
                const fetchedEvents = eventsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    let latitude, longitude;
                  
                    if (typeof data.locationCords === 'string') {
                      [latitude, longitude] = data.locationCords.split(', ').map(Number);
                    } else {
                      console.error('Error parsing location cords for event:', data);
                      latitude = null;
                      longitude = null;

                    }
                  
                    return {
                      ...data,
                      id: doc.id,
                      isEvent: true,
                      location: { latitude, longitude },
                    };
                  });
    
                const reportsSnapshot = await getDocs(reportsCollectionRef);
                const fetchedReports = reportsSnapshot.docs.map(doc => {
                const data = doc.data();
                let latitude, longitude;

                if (typeof data.locationCords === 'string') {
                    [latitude, longitude] = data.locationCords.split(', ').map(Number);
                } else {
                    console.error('Error parsing location cords for report:', data);
                    latitude = null;
                    longitude = null;
                    // You might want to handle this situation differently,
                    // such as by not including this item in the list.
                }

                return {
                    ...data,
                    id: doc.id,
                    isReport: true,
                    location: { latitude, longitude },
                };
                });

                setListData([...fetchedEvents, ...fetchedReports]);
            };
    
            fetchData();
        }, [])
    );

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return 'N/A';
        }
        const date = timestamp.toDate();
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toggleView} style={{ marginRight: 10 }}>
                    <Icon name={showMap ? "list" : "map"} size={25} color="#007bff" />
                </TouchableOpacity>
            ),
            title: showMap ? "Map View" : "List View",
        });

        const watchUserLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            watchPositionSub = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 5,
                },
                (location) => {
                    setUserLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }
            );
        };

        watchUserLocation();

        return () => {
            if (watchPositionSub) {
                watchPositionSub.remove();
            }
        };
    }, [showMap, navigation]);

    const zoomIn = () => {
        setMapRegion(prevRegion => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta / 2,
            longitudeDelta: prevRegion.longitudeDelta / 2,
        }));
    };

    const zoomOut = () => {
        setMapRegion(prevRegion => ({
            ...prevRegion,
            latitudeDelta: prevRegion.latitudeDelta * 2,
            longitudeDelta: prevRegion.longitudeDelta * 2,
        }));
    };

    const goToPennState = () => {
        setMapRegion(pennStateCoords);
        setShowMap(true);
    };

    const getCategoryIcon = (categoryName) => {
        const category = options.categories.find(cat => cat.name === categoryName);
        if (category) {
            return { icon: category.icon, color: category.color };
        } else {
            return { icon: 'info', color: '#9e9e9e' };
        }
    };

    const getIconName = (item) => {
        if (item.isEvent) {
            return getCategoryIcon(item.category);
        } else if (item.isReport) {
            return getCategoryIcon(item.category);
        } else {
            return { icon: 'info', color: '#9e9e9e' };
        }
    };

    const renderMarkers = () => {
        return listData.map(item => {
            const { latitude, longitude } = item.location;
            const { icon, color } = getIconName(item);

            return (
                <Marker
                    key={item.id}
                    coordinate={{ latitude, longitude }}
                    onPress={() => handleCalloutPress(item)}>
                    <Icon name={icon} size={30} color={color} />
                </Marker>
            );
        });
    };

    const handleCalloutPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleMultipleItemsPress = (items) => {
        setLocationItems(items);
        setIsLocationModalVisible(true);
    };

    const goToUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
            ...mapRegion,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setShowMap(true);
    };

    const renderItem = ({ item }) => {
        if (!item) {
            console.error('Item is undefined: ', item);
            return null;
        }
        const { icon, color } = getIconName(item);

        const handleMap = () => {
            setMapRegion({
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
            setShowMap(true);
        };

        return (
            <TouchableOpacity style={styles.eventItem} onPress={() => handleCalloutPress(item)}>
                <View style={[styles.iconContainer, { backgroundColor: item.color || '#007bff' }]}>
                    <Icon name={getIconName(item).icon} size={24} color="#fff" />
                </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.itemDetails}>
                    <Text style={styles.listItemHeader}>{item.title}</Text>
                    <Text style={styles.listItemText}>Type: {item.type}</Text>
                    <Text style={styles.listItemText}>Location: {item.locationDetails}</Text>
                    <Text style={styles.listItemText}>Date: {formatDate(item.dateTime)}</Text>
                </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleMap} style={styles.button}>
                        <Icon name="map" size={20} color="#fff" />
                    </TouchableOpacity>

                    <PopupModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        item={selectedItem}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {showMap ? (
                <>
                    <MapView style={styles.map} region={mapRegion}>
                        {renderMarkers()}

                        {userLocation && (
                            <Marker
                                coordinate={userLocation}
                                title="Current Location"
                            >
                                <Icon name="location-pin" size={30} color="#007bff" />
                            </Marker>
                        )}
                    </MapView>

                    <View style={styles.zoomControls}>
                        <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
                            <Icon name="zoom-in" size={25} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
                            <Icon name="zoom-out" size={25} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToPennState} style={styles.pennStateButton}>
                            <Image source={require('../../assets/penn-state.png')} style={styles.pennStateIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToUserLocation} style={styles.currentLocationButton}>
                            <Icon name="my-location" size={25} color="#000" />
                        </TouchableOpacity>

                        <PopupModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            item={selectedItem}
                        />

                        <MultipleEventsModal
                            isLocationModalVisible={isLocationModalVisible}
                            setIsLocationModalVisible={setIsLocationModalVisible}
                            locationItems={locationItems}
                            setSelectedItem={setSelectedItem}
                            setModalVisible={setModalVisible}
                            getIconName={getIconName}
                        />

                    </View>
                </>
            ) : (
                <FlatList
                    data={listData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}

        </View>
    );
};

export default HomeScreen;