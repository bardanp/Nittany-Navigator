import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    map: {
        flex: 1,
    },
    zoomControls: {
        position: 'absolute',
        bottom: 20,
        right: 20, 
        backgroundColor: 'transparent',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    zoomButton: {
        backgroundColor: '#ffffff', 
        borderWidth: 0, 
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, 
        borderRadius: 30, 
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    pennStateButton: {
        position: 'absolute',
        bottom: 10, 
        right: 350, 
        backgroundColor: '#ffffff', 
        borderRadius: 30, 
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 10, 
    },
    currentLocationButton: {
        backgroundColor: '#ffffff', 
        position: 'absolute',
        bottom: 125, 
        right: 0, 
        borderRadius: 30, 
        padding: 10,
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    pennStateIcon: {
        width: 30,
        height: 30, 
    },
    emergencyItem: {
        borderColor: 'red', 
        borderWidth: 2,
    },
    emergency: {
        color: 'red',
        fontWeight: 'bold',
    },
    eventItem: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#999',
        lineHeight: 18,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    button: {
        marginLeft: 8,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
        customMarker: {
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
        },
        markerText: {
            fontWeight: 'bold',
            color: 'black',
        },
      customCallout: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#FFF',
        borderColor: '#DDD',
        borderWidth: 1,
        width: 250, 
      },
      calloutTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
      calloutDescription: {
        color: '#666',
      },
      viewDetailsButton: {
        marginTop: 10,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
      },
      viewDetailsButtonText: {
        color: "#ffffff",
        textAlign: "center",
      },
      customMarkerView: {
        backgroundColor: "#007bff",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    customMarkerText: {
        color: "#fff",
        fontWeight: "bold",
    },
    
    markerIconContainer: {
        width: 50, // Adjust based on your icon size
        height: 50, // Adjust based on your icon size
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    markerIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    badgeContainer: {
        position: 'absolute',
        right: -10, // Adjust for positioning
        top: -10, // Adjust for positioning
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20, // Adjust based on content
        height: 20, // Adjust based on content
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12, // Adjust based on content
    },
    
});