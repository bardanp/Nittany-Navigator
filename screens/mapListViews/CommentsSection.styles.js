import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 428) * size;

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  commentContainer: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
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
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#007bff',
  },
  commentText: {
    marginTop: scale(4),
    fontSize: scale(14),
    color: '#333',
  },
  commentDate: {
    marginTop: scale(4),
    fontSize: scale(12),
    color: '#666',
  },
  deleteButton: {
    marginLeft: scale(12),
    padding: scale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    marginRight: scale(8),
    padding: scale(10),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: scale(20),
    fontSize: scale(14),
    color: '#495057',
  },
  button: {
    padding: scale(10),
    backgroundColor: '#007bff',
    borderRadius: scale(20),
  },
  buttonText: {
    fontSize: scale(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
});

export default styles;
