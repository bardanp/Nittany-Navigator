import { StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');
const modalWidth = width * 0.9;
const colors = {
  background: '#FFFFFF',
  primary: '#0A47A0',
  primaryDark: '#002C5F',
  primaryLight: '#74A0E8',
  secondary: '#F5F5F7',
  textPrimary: '#0A47A0',
  textSecondary: '#4F4F4F',
  border: '#E0E0E0',
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
  actionBlue: '#0A47A0',
  white: '#FFFFFF',
};

async function loadFonts() {
  await Font.loadAsync({
    Montserrat: require('../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
  });
}

loadFonts();


export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    width: modalWidth,
    maxHeight: height * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  actionContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    width: 70,
    height: 60,

  },
  bookmarkButton: {
    position: 'absolute',
    left: 10, // Place it on the left
    top: '50%',
    marginTop: -20, 
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.primary,
  },
  category: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: colors.white,
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
    borderWidth: .5,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  details: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  emergency: {
    color: colors.danger,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.success,
    backgroundColor: colors.success,
    margin: 10,
  },
  saveButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  saveButtonDisabled: {
    backgroundColor: colors.border,
  },
unsaveButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.danger,
  backgroundColor: colors.danger,
  marginTop: 10,
  paddingVertical: 10,
},

  unsaveButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: colors.closeButton,
    padding: 8,
    borderRadius: 16,
    elevation: 6,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
  },
  closeIcon: {
    fontSize: 24,
    color: '#fff', 
  },
  shadow: {
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    elevation: 5, 
  },
  closeIconContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export { colors };