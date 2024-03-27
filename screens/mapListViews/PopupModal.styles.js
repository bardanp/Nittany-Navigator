import { StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font'; 

const { width, height } = Dimensions.get('window');
const modalWidth = width * 0.9;

const colors = {
  background: '#FFFFFF', 
  primary: '#5E81F4', 
  primaryDark: '#5071c4', 
  primaryLight: '#7a9ef7', 
  secondary: '#F5F5F7', 
  textPrimary: '#333333', 
  textSecondary: '#4F4F4F', 
  border: '#E0E0E0', 
  success: '#4CAF50', 
  danger: '#FF5252',
  warning: '#FFC107', 
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
    backgroundColor: colors.primary, 
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
    fontFamily: 'Montserrat', 
    fontWeight: '500',
    fontSize: 26,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: 'Montserrat', 
    fontWeight: '400', 
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
    height: 48, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24, 
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
