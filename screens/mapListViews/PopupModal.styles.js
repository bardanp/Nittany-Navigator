import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const modalWidth = width * 0.9;

// New Color Palette
const colors = {
  background: '#FFFFFF', // White
  primary: '#5E81F4', // Base
  primaryDark: '#5071c4', // Darker shade for pressed button state
  primaryLight: '#7a9ef7', // Lighter tint for hover state
  secondary: '#F5F5F7', // Light grey for backgrounds and elements
  textPrimary: '#333333', // Almost black for primary text
  textSecondary: '#4F4F4F', // Dark grey for secondary text
  border: '#E0E0E0', // Light grey for borders
  success: '#4CAF50', // Success or confirmation actions
  danger: '#FF5252', // Alerts, errors, or important actions
  warning: '#FFC107', // Warnings or caution needed
  
};

// Updated Styles
export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Softer overlay
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: 12, // Rounded corners
    width: modalWidth,
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    padding: 20, 
    backgroundColor: colors.primary, // Primary color for header
    alignItems: 'center',
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
  },
  category: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  imageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Montserrat', // Or 'Montserrat', 'Noto Sans', 'Open Sans', 'Source Sans Pro'
    fontWeight: '500',
    fontSize: 26,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: 'Montserrat', // Or 'Montserrat', 'Noto Sans', 'Open Sans', 'Source Sans Pro'
    fontWeight: '400', // Normal weight for description to make it slightly heavier for better readability
    fontSize: 20,
    color: colors.textSecondary,
  },
  details: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 10,
  },
  emergency: {
    color: colors.danger,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: colors.danger,
    width: '60%',
    height: 48, // Touch-friendly button height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24, // Fully rounded corners
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
