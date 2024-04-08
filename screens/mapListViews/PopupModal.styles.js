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

const scale = (size) => (width / 428) * size;

Font.loadAsync({
  'Montserrat': require('../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
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
    borderRadius: scale(16),
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
    top: scale(5),
    right: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    borderRadius: scale(4),
    width: scale(70),
    height: scale(60),
  },
  bookmarkButton: {
    position: 'absolute',
    left: scale(10),
    top: '50%',
    marginTop: scale(-20),
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: colors.primary,
  },
  category: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(24),
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
    borderBottomWidth: scale(0.5),
    borderBottomColor: colors.border,
  },
  body: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(20),
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: scale(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: scale(16),
    color: colors.textSecondary,
    marginBottom: scale(10),
  },
  details: {
    fontFamily: 'Montserrat',
    fontSize: scale(14),
    color: colors.textSecondary,
    marginBottom: scale(5),
  },
  emergency: {
    color: colors.danger,
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(16),
    borderWidth: scale(1),
    borderColor: colors.success,
    backgroundColor: colors.success,
    margin: scale(10),
  },
  saveButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: scale(10),
    fontSize: scale(16),
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
    paddingHorizontal: scale(20),
    borderRadius: scale(16),
    borderWidth: scale(1),
    borderColor: colors.danger,
    backgroundColor: colors.danger,
    marginTop: scale(10),
    paddingVertical: scale(10),
  },
  unsaveButtonText: {
    fontFamily: 'Montserrat',
    marginLeft: scale(10),
    fontSize: scale(16),
    color: colors.white,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: colors.closeButton,
    padding: scale(8),
    borderRadius: scale(16),
    elevation: scale(6),
    shadowRadius: scale(4),
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
  },
  closeIcon: {
    fontSize: scale(24),
    color: '#fff',
  },
  shadow: {
    shadowOpacity: 0.7,
    shadowRadius: scale(5),
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    elevation: scale(5),
  },
  closeIconContainer: {
    padding: scale(10),
    borderRadius: scale(20),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
export { colors };
