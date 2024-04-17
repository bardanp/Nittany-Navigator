import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const scale = (size) => (screenWidth / 428) * size;

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: scale(0),
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: screenWidth,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  commentAuthor: {
    fontSize: scale(14),
    fontWeight: '900',
    color: '#333',
  },
  commentText: {
    fontSize: scale(12),
    color: '#444',
    lineHeight: scale(22),
    marginBottom: scale(8),
  },
  commentDate: {
    fontSize: scale(12),
    color: '#666',
    fontStyle: 'italic',
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: scale(8),
  },
  errorText: {
    color: 'red',
    fontSize: scale(14),
    textAlign: 'center',
    marginTop: scale(16),
  },
  noCommentsText: {
    fontSize: scale(16),
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderColor: '#f8f9fa',
    borderWidth: scale(58),
  },
  commentsListContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: scale(8),
    paddingTop: scale(12),
    padding: scale(12),
    fontSize: scale(14),
    color: '#495057',
    margin: scale(12),
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: scale(8),
    paddingVertical: scale(10), 
    paddingHorizontal: scale(16),
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