import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './PopupModal.styles';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 428) * size;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    width: screenWidth, 
    maxHeight: '100%',
    backgroundColor: '#f8f9fa',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(4),
  },
  commentAuthor: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: colors.primary,
  },
  commentText: {
    fontSize: scale(14),
    color: '#333',
    lineHeight: scale(20),
  },
  commentDate: {
    fontSize: scale(12),
    color: '#666',
    marginTop: scale(4),
    fontStyle: 'italic',
  },
  deleteButton: {
    marginLeft: scale(10),
    padding: scale(6),
  },
  errorText: {
    color: 'red', 
    fontSize: scale(14), 
    textAlign: 'center', 
    marginTop: scale(10), 
  },
  noCommentsText: {
    fontSize: scale(16), 
    fontStyle: 'italic', 
    color: '#555', 
    textAlign: 'center', 
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    height: scale(80), 
    alignItems: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    backgroundColor: '#f8f9fa',
    borderTopWidth: 5,
    borderTopColor: '#e0e0e0',
    marginBottom: scale(20),
  },
  input: {
    flex: 1,
    height: scale(50), 
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
