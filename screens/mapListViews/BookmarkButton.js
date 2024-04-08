import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Animated, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore } from '../../backend/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const scale = (size) => (width / 428) * size;

const BookmarkButton = ({ itemId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const scaleAnimation = new Animated.Value(1);

  useEffect(() => {
    const checkIfSaved = async () => {
      setLoading(true);
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (!userInfoString) {
          console.error('User info not found');
          return;
        }
        const { email } = JSON.parse(userInfoString);
        const userRef = doc(firestore, 'users', email);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsSaved(userData.savedItems?.includes(itemId));
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkIfSaved();
  }, [itemId]);

  const handleBookmarkChange = async (action) => {
    setLoading(true);
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (!userInfoString) throw new Error('User info not found');
      const { email } = JSON.parse(userInfoString);
      const userRef = doc(firestore, 'users', email);
      await updateDoc(userRef, {
        savedItems: action === 'add' ? arrayUnion(itemId) : arrayRemove(itemId),
      });
      setIsSaved(action === 'add');
      Alert.alert(`Bookmark ${action === 'add' ? 'added' : 'removed'}`);
    } catch (error) {
      Alert.alert('Error', error.message || 'There was an issue updating the bookmark.');
    } finally {
      setLoading(false);
    }
  };

  const handlePress = () => {
    handleBookmarkChange(isSaved ? 'remove' : 'add');
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnimation }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={() => {
          Animated.spring(scaleAnimation, {
            toValue: 0.95,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scaleAnimation, {
            toValue: 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
          }).start();
        }}
        style={({ pressed }) => [
          styles.button,
          isSaved ? styles.buttonSaved : styles.buttonUnsaved,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Ionicons
            name={isSaved ? 'ios-bookmark' : 'ios-bookmark-outline'}
            size={scale(28)}
            color={isSaved ? '#34C759' : '#007AFF'}
          />
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: scale(10),
    borderRadius: scale(20),
    width: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    shadowColor: '#000',
    shadowOffset: { height: scale(2), width: 0 },
    elevation: scale(5),
  },
  buttonUnsaved: {
    backgroundColor: 'transparent',
  },
  buttonSaved: {
    backgroundColor: 'transparent',
  },
  buttonLoading: {
    backgroundColor: '#FFD700',
  },
});

export default BookmarkButton;
