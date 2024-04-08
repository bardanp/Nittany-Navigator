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
    borderRadius: scale(14),
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
    top: scale(3),
    right: scale(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(8),
    borderRadius: scale(2),
    width: scale(60),
    height: scale(50),
  },
  bookmarkButton: {
    position: 'absolute',
    left: scale(8),
    top: '50%',
    marginTop: scale(-18),
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    backgroundColor: colors.primary,
  },
  category: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(22),
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
    paddingHorizontal: scale(18),
    paddingTop: scale(8),
    paddingBottom: scale(18),
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  description: {
    fontFamily: 'Montserrat',
    fontSize: scale(14),
    color: colors.textSecondary,
    marginBottom: scale(8),
  },
  details: {
    fontFamily: 'Montserrat',
    fontSize: scale(12),
    color: colors.textSecondary,
    marginBottom: scale(3),
  },
  emergency: {
    color: colors.danger,
    fontWeight: 'bold',
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
    backgroundColor: colors.closeButton,
    padding: scale(6),
    borderRadius: scale(14),
    elevation: scale(4),
    shadowRadius: scale(2),
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
  },
  closeIcon: {
    fontSize: scale(22),
    color: '#fff',
  },
  shadow: {
    shadowOpacity: 0.7,
    shadowRadius: scale(3),
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    elevation: scale(3),
  },
  closeIconContainer: {
    padding: scale(8),
    borderRadius: scale(18),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
export { colors };
