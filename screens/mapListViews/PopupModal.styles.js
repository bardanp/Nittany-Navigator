import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const modalWidth = width * 0.9;
const primaryColor = '#4CAF50'; // Green
const dangerColor = '#F44336'; // Red
const textColor = '#333'; // Dark grey for text
const borderColor = '#E0E0E0'; // Light grey for borders
const backgroundColor = '#FFF'; // White background

export default StyleSheet.create({
  // Overlay for modal background
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  // Container for modal content
  modalContainer: {
    backgroundColor: backgroundColor,
    borderRadius: 20,
    overflow: 'hidden',
    width: modalWidth,
    maxHeight: height * 0.8,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // Container for scrollable content
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },

  // Image container styles
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },

  // Image styles
  image: {
    width: '100%',
    height: '100%',
  },

  // Header styles
  header: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Category text within header
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Container for body content
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Title text style
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textColor,
    paddingTop: 20,
    paddingBottom: 10,
  },

  // Description text style
  description: {
    fontSize: 16,
    color: textColor,
    marginBottom: 15,
  },

  // Details text style
  details: {
    fontSize: 14,
    color: textColor,
    marginBottom: 10,
  },
  emergency: {
    color: dangerColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: dangerColor,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },

  input: {
    fontSize: 16,
    color: textColor,
  },

  buttonPrimary: {
    backgroundColor: primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
  mt: { marginTop: 10 },
  mb: { marginBottom: 10 },
  ml: { marginLeft: 10 },
  mr: { marginRight: 10 },
  pt: { paddingTop: 10 },
  pb: { paddingBottom: 10 },
  pl: { paddingLeft: 10 },
  pr: { paddingRight: 10 },
});
