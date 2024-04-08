import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 428) * size;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: scale(12),
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  commentContainer: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentAuthor: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#007bff',
  },
  commentText: {
    marginTop: scale(2),
    fontSize: scale(12),
    color: '#333',
  },
  commentDate: {
    marginTop: scale(2),
    fontSize: scale(10),
    color: '#666',
  },
  deleteButton: {
    marginLeft: scale(10),
    padding: scale(6),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    marginRight: scale(6),
    padding: scale(8),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: scale(18),
    fontSize: scale(12),
    color: '#495057',
  },
  button: {
    padding: scale(8),
    backgroundColor: '#007bff',
    borderRadius: scale(18),
  },
  buttonText: {
    fontSize: scale(12),
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
});

export default styles;
