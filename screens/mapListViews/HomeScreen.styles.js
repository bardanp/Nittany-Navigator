import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', 
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

    // Styles for the list view
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
    info: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#999',
        lineHeight: 18,
    },
    button: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#007bff',
        marginBottom: 4,
    },
    infoButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    customMarker: {
        backgroundColor: "#FFF",
        padding: 5,
        borderRadius: 5,
        borderColor: '#CCC',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      markerText: {
        color: '#333',
        fontWeight: 'bold',
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
      
});