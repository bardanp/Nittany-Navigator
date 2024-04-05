import React, { useState } from 'react';
import { Pressable, StyleSheet, Animated, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookmarkButton = ({ isSaved, onSave, onUnsave }) => {
  const scale = new Animated.Value(1);
  const [loading, setLoading] = useState(false);

  const animatePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = async () => {
    setLoading(true);
    animatePressOut();
    try {
      if (isSaved) {
        await onUnsave();
        Alert.alert('Bookmark removed');
      } else {
        await onSave();
        Alert.alert('Bookmark added');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an issue updating the bookmark.');
    } finally {
      setLoading(false);
    }
  };

  const animatedStyle = {
    transform: [{ scale }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
        style={({ pressed }) => [
          styles.button,
          isSaved ? styles.buttonSaved : styles.buttonUnsaved,
          loading && styles.buttonLoading,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Ionicons
            name={isSaved ? "ios-bookmark" : "ios-bookmark-outline"} 
            size={28}
            color={isSaved ? '#34C759' : '#007AFF'} 
          />
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 5,
  },
  buttonUnsaved: {
    backgroundColor: 'white',
  },
  buttonSaved: {
    backgroundColor: 'transparent',
  },
  buttonLoading: {
    backgroundColor: '#FFD700',
  },
});

export default BookmarkButton;
