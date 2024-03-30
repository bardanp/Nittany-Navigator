import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookmarkButton = ({ isSaved, onSave, onUnsave }) => {
  const handlePress = () => {
    if (isSaved) {
      onUnsave();
    } else {
      onSave();
    }
  };

  return (
    <Pressable onPress={handlePress} style={isSaved ? styles.buttonSaved : styles.buttonUnsaved}>
      <Ionicons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={28} 
        color={isSaved ? '#FFFFFF' : '#FFFFFF'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonUnsaved: {
    backgroundColor: '#5E81F4', 
    padding: 10,
    borderRadius: 15, 
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 },
  },
  buttonSaved: {
    backgroundColor: '#74A0E8', 
    padding: 10,
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 },
  },
});

export default BookmarkButton;
