import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './HomeScreen.styles.js';
import * as Location from 'expo-location';
import PopupModal from './PopupModal.js';
const eventsData = require('../../backend/events/events.json');
const reportsData = require('../../backend/reports/reports.json');

const HomeScreen = ({ isMap, toggleMapView }) => {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const listData = [
        ...eventsData.map(e => ({ ...e, id: `event-${e.event_id}`, isEvent: true })),
        ...reportsData.map(r => ({ ...r, id: `report-${r.report_id}`, isReport: true }))
    ];
    
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

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toggleView} style={{ marginRight: 10 }}>
                    <Icon name={showMap ? "list" : "map"} size={25} color="#007bff" />
                </TouchableOpacity>
            ),
            title: showMap ? "Map View" : "List View",
        });
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


    const getIconName = (item) => {
        if (item.isEvent) {
          return 'event';
        } else {
          return 'report-problem';
        }
      };
    

      const handleCalloutPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };
    
    


    const renderItem = ({ item }) => {
    
        const handleMap = (latitude, longitude) => {
            setMapRegion({
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
            setShowMap(true);
        };
        
        const handleDesc = (item) => {
            let message = `Title: ${item.title}\nDescription: ${item.description || item.reportDescription}\nDate: ${formatDate(item.timestamp)}\nLocation: ${item.location}\nCreated by: ${item.createdBy}`;
        
            if (item.participants) {
                message += `\nParticipants: ${item.participants}`;
            }
        
            if (item.emergency) {
                message += `\nEMERGENCY`;
            }
        
            alert(message);
        };
    
        const formatDate = (timestamp) => {
            const date = new Date(timestamp.seconds * 1000); 
            return date.toLocaleDateString(); 
        };


        return (
            <View style={[styles.eventItem, item.emergency && styles.emergencyItem]}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.info}>{`Date: ${formatDate(item.timestamp)}`}</Text>
                    <Text style={styles.info}>{`Location: ${item.location}`}</Text>
                    <Text style={styles.info}>{`Created by: ${item.createdBy}`}</Text>
                    {item.participants && <Text style={styles.info}>{`Participants: ${item.participants}`}</Text>}
                    {item.emergency && <Text style={styles.emergency}>EMERGENCY</Text>}
                </View>
                <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleMap(item.latitude, item.longitude)} style={[styles.button, styles.mapButton]}>
                    <Icon name="map" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDesc(item)} style={[styles.button, styles.infoButton]}>
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
                    {listData.map((item) => (
                        <Marker
                        key={item.id}
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                        title={item.title} 
                        >
                        <Icon name={getIconName(item)} size={30} color={item.isEvent ? "#007bff" : "#ff0000"} />
                        <Callout onPress={() => handleCalloutPress(item)}>
                        <View style={styles.customCallout}>
                            <Text style={styles.calloutTitle}>{item.title}</Text>
                            <TouchableOpacity
                            onPress={() => handleCalloutPress(item)}
                            style={styles.viewDetailsButton}
                            >
                            <Text style={styles.viewDetailsButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                        </Callout>

                        </Marker>
                        ))}
                    </MapView>

                    <View style={styles.zoomControls}>
                        <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
                            <Icon name="zoom-in" size={25} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
                            <Icon name="zoom-out" size={25} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToPennState} style={styles.pennStateButton}>
                            <Image source={require('/Users/bardanphuyel/Documents/GitHub/NittanyNavigator/assets/penn-state.png')} style={styles.pennStateIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToUserLocation} style={styles.currentLocationButton}>
                            <Icon name="my-location" size={25} color="#000" /> 
                        </TouchableOpacity>


                        <PopupModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        item={selectedItem}
                        />

                    </View>
                </>
            ) : (
                <FlatList
                data={listData}
                keyExtractor={(item) => `${item.event_id || item.report_id}-${item.isEvent ? 'E' : 'R'}`}
                renderItem={renderItem}

                />
            )}

        </View>
    );
};

export default HomeScreen;  

