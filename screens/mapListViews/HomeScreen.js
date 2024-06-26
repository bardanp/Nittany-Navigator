import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, TouchableOpacity, Text, Image, TextInput, FlatList, Modal } from 'react-native';
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

const SearchBar = ({ onSearch, searchQuery, toggleFilter, filterType }) => (
    <View style={[styles.searchContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <TextInput
            style={styles.searchInput}
            placeholder="Search events or reports..."
            value={searchQuery}
            onChangeText={onSearch}
        />
        <TouchableOpacity onPress={toggleFilter}>
            <Icon name={filterType === 'all' ? 'filter-list' : filterType === 'events' ? 'event' : 'report'} size={25} color="#007bff" />
        </TouchableOpacity>
    </View>
);

const HomeScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [listData, setListData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
    const [locationItems, setLocationItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('all'); // 'all', 'events', 'reports'



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

    const toggleFilter = () => {
        setFilterType(current => {
          if (current === 'all') return 'events';
          if (current === 'events') return 'reports';
          return 'all';
        });
    };
      

    const handleSearch = (query) => {
        setSearchQuery(query);
        const lowercasedQuery = query.toLowerCase();
      
        const filtered = listData
          .filter(item => {
            // Apply the category filter
            if (filterType === 'events' && !item.isEvent) return false;
            if (filterType === 'reports' && item.isEvent) return false;
            return true;
          })
          .filter(item => {
            // Apply the search query filter
            if (query.trim() === '') return true;
            return (
              item.title.toLowerCase().includes(lowercasedQuery) ||
              item.description.toLowerCase().includes(lowercasedQuery) ||
              (item.organizer && item.organizer.toLowerCase().includes(lowercasedQuery)) ||
              (item.category && item.category.toLowerCase().includes(lowercasedQuery))
            );
          });
      
        setFilteredData(filtered);
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
            
                    if (data.locationCords && typeof data.locationCords === 'string') {
                      [latitude, longitude] = data.locationCords.split(',').map(coord => parseFloat(coord.trim()));
                    } else if (data.location && typeof data.location === 'object') {
                      latitude = data.location.latitude;
                      longitude = data.location.longitude;
                    } else {
                      console.error('Error parsing location for event:', data);
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
            
                    if (data.locationCords && typeof data.locationCords === 'string') {
                      [latitude, longitude] = data.locationCords.split(',').map(Number);
                    } else if (data.location && typeof data.location === 'object') {
                      latitude = data.location.latitude;
                      longitude = data.location.longitude;
                    } else {
                      console.error('Error parsing location cords for report:', data);
                      latitude = null;
                      longitude = null;
                    }
            
                    return {
                      ...data,
                      id: doc.id,
                      isReport: true,
                      location: { latitude, longitude },
                    };
                }).filter(item => item !== null);

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
        setFilteredData(listData);
      }, [listData]);

      useEffect(() => {
        handleSearch(searchQuery);
      }, [filterType, listData]);
      

      const FilterButton = () => (
        <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>
            {filterType === 'all' ? 'All' : filterType === 'events' ? 'Events' : 'Reports'}
          </Text>
        </TouchableOpacity>
      );

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

    const getCategoryIcon = (categoryName, isEvent = true) => {
        const categories = isEvent ? options.categories : options.reportCategories;
        const category = categories.find(cat => cat.name === categoryName);
        if (category) {
            return { icon: category.icon, color: category.color };
        } else {
            return { icon: 'info', color: '#9e9e9e' };
        }
    };
    

    const getIconName = (item) => {
        if (item.isEvent) {
            return getCategoryIcon(item.category, true);
        } else if (item.isReport) {
            return getCategoryIcon(item.category, false);
        } else {
            return { icon: 'info', color: '#9e9e9e' };
        }
    };
    

    const renderMarkers = () => {
        return filteredData.map(item => {
            const { latitude, longitude } = item.location;
            const { icon, color } = getIconName(item); 

            return (
                <Marker
                    key={item.id}
                    coordinate={{ latitude, longitude }}
                    onPress={() => handleCalloutPress(item)}>
                    <Icon name={icon} size={28} color={color} />
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
            <>

            <TouchableOpacity style={styles.eventItem} onPress={() => handleCalloutPress(item)}>
                <View style={[styles.iconContainer, { backgroundColor: color }]}>
                    <Icon name={getIconName(item).icon} size={24} color="#fff" />
                </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.itemDetails}>
                    <Text style={styles.listItemHeader}>{item.title}</Text>
                    <Text style={styles.listItemText}>{`Location: ${item.locationDetails || 'N/A'}`}</Text>
                    <Text style={styles.listItemText}>Date: {formatDate(item.dateTime)}</Text>
                    <Text style={styles.listItemText}>{`Created by: ${item.createdBy || 'Unknown'}`}</Text>
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
            </>
        );
    };

    return (
        <View style={styles.container}>
            {showMap ? (
                <>
                 <SearchBar onSearch={handleSearch} searchQuery={searchQuery} toggleFilter={toggleFilter} filterType={filterType} />
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
                <>
                 <SearchBar onSearch={handleSearch} searchQuery={searchQuery} toggleFilter={toggleFilter} filterType={filterType} />
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
                </>
            )}

        </View>
    );
};

export default HomeScreen;