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
  textPrimary: '#32325D',
  textSecondary: '#8898AA',
  border: '#E9ECEF',
  success: '#2DCE89',
  danger: '#F5365C',
  warning: '#FFC107',
  actionBlue: '#0A47A0',
  white: '#FFFFFF',
};

const scale = (size) => (width / 428) * size;

Font.loadAsync({
  'Montserrat': require('../../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('../../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
});

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: colors.background,
    width: width,
    maxHeight: height,
    elevation: 5,
    overflow: 'hidden',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(8),
  },
  bookmarkButton: {
    left: scale(8),
    top: '50%',
    marginTop: scale(-18),
    zIndex: 10,
  },
  addCalendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
    paddingHorizontal: scale(14),
    borderRadius: scale(14),
    borderWidth: scale(1),
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    margin: scale(8),
  },
  addCalendarButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: scale(8),
    fontSize: scale(14),
    color: colors.white,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: scale(16),
    borderBottomWidth: scale(4),
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 70,
    paddingVertical: scale(15),
    paddingHorizontal: scale(16), 
    backgroundColor: colors.primary,
    borderTopRightRadius: scale(15),
    borderTopLeftRadius: scale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  directionsButton: {
    padding: scale(2),
    marginRight: scale(8),
    borderRadius: scale(25),
    backgroundColor: colors.actionBlue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    width: scale(44),
    height: scale(44),
  },
  category: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(20),
    color: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  imageContainer: {
    width: '100%',
    height: scale(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(4),
    borderBottomColor: colors.border,
  },
  body: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(200),
    backgroundColor: colors.white,
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(22),
    color: colors.primary,
    flex: 1, 
    textAlign: 'center', 
    marginHorizontal: scale(44), 
    borderBottomWidth: scale(4),
    borderBottomColor: 'black',
  },
  
  description: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(16),
    color: colors.primary,
    lineHeight: scale(20),
    marginBottom: scale(12),
  },
  details: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(14),
    color: colors.textSecondary,
    marginBottom: scale(4),
  },
  emergency: {
    fontFamily: 'Montserrat-Bold',
    color: colors.danger,
    fontSize: scale(14),
    marginBottom: scale(8),
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
    paddingHorizontal: scale(14),
    borderRadius: scale(14),
    borderWidth: scale(1),
    borderColor: colors.success,
    backgroundColor: colors.success,
    margin: scale(8),
  },
  saveButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: scale(8),
    fontSize: scale(14),
    color: colors.white,
    fontWeight: '500',
  },
  saveButtonDisabled: {
    backgroundColor: colors.border,
  },
  unsaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(18),
    borderRadius: scale(14),
    borderWidth: scale(1),
    borderColor: colors.danger,
    backgroundColor: colors.danger,
    marginTop: scale(8),
    paddingVertical: scale(8),
  },
  unsaveButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: scale(8),
    fontSize: scale(14),
    color: colors.white,
    fontWeight: '500',
  },
  closeButton: {
    padding: scale(6),
    borderRadius: scale(14),
    elevation: scale(4),
    backgroundColor: '#ffffff',
  },
  closeIcon: {
    fontSize: scale(22),
    color: '#fff',
  },
  closeIconContainer: {
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 0, 
    backgroundColor: colors.background,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(20),
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary, 
  },
  tabText: {
    fontSize: scale(16),
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default styles;
export { colors };
