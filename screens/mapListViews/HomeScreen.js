import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, TouchableOpacity, Text, Image, FlatList, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './HomeScreen.styles.js';
import * as Location from 'expo-location';
import PopupModal from './PopupModal.js';
import { firestore } from '../../backend/firebase.js'; 
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import options from '../../backend/options.json';
import MultipleEventsModal from './MultipleEventsModal.js'; 


const HomeScreen = ({  }) => {
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
                const fetchedEvents = eventsSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: `event-${doc.id}`,
                    isEvent: true,
                }));
    
                const reportsSnapshot = await getDocs(reportsCollectionRef);
                const fetchedReports = reportsSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: `report-${doc.id}`,
                    isReport: true,
                }));

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
        switch (categoryName) {
            case 'Emergency':
                return { icon: 'warning', color: '#ff0000' };
            case 'School Closure':
                return { icon: 'school', color: '#ff5722' }; 
            case 'Construction':
                return { icon: 'construction', color: '#ff9800' }; 
            case 'Maintenance':
                return { icon: 'build', color: '#ffeb3b' }; 
            case 'Other':
            default:
                return { icon: 'info', color: '#607d8b' }; 
        }
    };

    const getIconName = (item) => {
        if (item.isEvent) {
            return { icon: 'event', color: '#1976d2' };
        } else if (item.isReport) {
            return getCategoryIcon(item.category); 
        } else {
            return { icon: 'help_outline', color: '#9e9e9e' }; 
        }
    };

    

    const renderMarkers = () => {
        const itemsByLocation = listData.reduce((acc, item) => {
            const location = options.locations.find(loc => loc.name === item.location);
            if (location) {
                const key = `${location.latitude}-${location.longitude}`;
                if (!acc[key]) {
                    acc[key] = {
                        ...location,
                        items: [item]
                    };
                } else {
                    acc[key].items.push(item);
                }
            }
            return acc;
        }, {});
    
        return Object.entries(itemsByLocation).map(([key, locationWithItems]) => {
            const { latitude, longitude, items } = locationWithItems;
            if (items.length === 1) {
                const item = items[0];
                const { icon, color } = getIconName(item);
                return (
                    <Marker
                        style={{opacity: 1}}
                        key={item.id}
                        coordinate={{
                            latitude,
                            longitude
                        }}
                        onPress={() => handleCalloutPress(item)}>
                        <Icon name={icon} size={30} color={color} />
                    </Marker>
                );
            } else {
                const count = items.length; 
                return (
                <Marker
                    key={key}
                    coordinate={{
                        latitude,
                        longitude
                    }}
                    onPress={() => handleMultipleItemsPress(items)}
                >
                    <View style={styles.customMarkerView}
                    >
                        <Text style={styles.customMarkerText}>{`${count} Items`}</Text>
                    </View>
                </Marker>


                );
            }
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
    
        const handleDesc = () => {
            setSelectedItem(item);
            setModalVisible(true);
        };
    
        return (
            <View style={styles.eventItem}>
                <View style={[styles.iconContainer, { backgroundColor: color }]}>
                    <Icon name={icon} size={24} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.info}>{`Date: ${item.dateTime ? formatDate(item.dateTime) : 'N/A'}`}</Text>
                    <Text style={styles.info}>{`Location: ${item.location}`}</Text>
                    {item.participants && <Text style={styles.info}>{`Participants: ${item.participants}`}</Text>}
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleMap} style={styles.button}>
                        <Icon name="map" size={20} color="#fff" />
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={handleDesc} style={styles.button}>
                        <Icon name="info" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
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
