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
  header: {
    width: '100%',
    padding: 20, 
    backgroundColor: '#0A47A0', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    flexDirection: 'row', 
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
    borderWidth: .5,
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
    marginBottom: 10,
    padding: 10,
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
  paddingVertical: 10,
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
    backgroundColor: colors.danger,
    width: '60%',
    height: 48, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16, 
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


export { colors };