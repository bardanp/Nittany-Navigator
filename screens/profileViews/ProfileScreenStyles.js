// ProfileScreenStyles.js
import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAEFFB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfoSection: {
    marginBottom: 40,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#555',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    width: '80%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeaderText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#555',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
