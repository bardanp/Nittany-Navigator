import { StyleSheet } from "react-native-web";

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonBack: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      backgroundColor: '#dc3545',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});