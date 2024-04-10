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
    maxHeight: height * 0.85,
    elevation: 5,
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
    backgroundColor: colors.primary,
    padding: scale(16),
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
    paddingBottom: scale(24),
    backgroundColor: colors.white,
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(24),
    color: colors.white,
  },
  description: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(16),
    color: colors.textSecondary,
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
    backgroundColor: colors.closeButton,
    padding: scale(6),
    borderRadius: scale(14),
    elevation: scale(4),
    shadowRadius: scale(2),
    shadowOpacity: 0.1,
    shadowColor: '#000',
    background: '#fff',
    shadowOffset: { height: 2, width: 2 },
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
    marginTop: scale(50),
    backgroundColor: colors.background,
    borderBottomWidth: scale(1),
    borderBottomColor: colors.border,
    borderTopRightRadius: scale(15), 
    borderTopLeftRadius: scale(15), 
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
