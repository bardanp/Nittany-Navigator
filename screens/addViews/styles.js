import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5', // Light grey background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative', // Ensure the positioning context
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark grey
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center', // Center the text horizontally
  },
  input: {
    backgroundColor: '#FFF', // White
    borderWidth: 1,
    borderColor: '#DDD', // Light grey border
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
    color: '#333', // Dark grey text
    shadowColor: '#000', // Black shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  datePicker: {
    ...this.input,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF', // Blue button
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#007BFF', // Blue shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Dark grey text
  },
  optionContainer: {
    ...this.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#007BFF', // Blue text
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black
  },
  modalView: {
    backgroundColor: '#FFF', // White modal background
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000', // Black shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  formSubmitButton: {
    backgroundColor: '#28A745', // Green button
    borderRadius: 5,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  formSubmitButtonText: {
    color: '#FFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
});
