import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { firestore } from '../../backend/firebase';
import { deleteDoc, doc } from 'firebase/firestore';


import { collection, query, where, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CommentsSection.styles';
import { colors } from './PopupModal.styles';
import { Ionicons } from '@expo/vector-icons';


const CommentsSection = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
    const fetchCurrentUserEmail = async () => {
        setIsLoadingUser(true);
        const userInfoString = await AsyncStorage.getItem('userInfo');
        // console.log("User Info String:", userInfoString);
        if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setCurrentUserEmail(userInfo.email);
        }
        setIsLoadingUser(false);
    };

    fetchCurrentUserEmail();
    }, []);


  useEffect(() => {
    const fetchCurrentUserEmail = async () => {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setCurrentUserEmail(userInfo.email);
      }
    };

    fetchCurrentUserEmail();
  }, []);

  useEffect(() => {
    if (itemId) {
      const fetchComments = async () => {
        const q = query(collection(firestore, 'comments'), where('docID', '==', itemId), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("Fetched Comments:", fetchedComments);
        setComments(fetchedComments);
      };
      fetchComments();
    }
  }, [itemId]);

  const handleAddComment = async () => {
    if (!newCommentText.trim() || !itemId) {
      console.error('Comment text or itemId is undefined');
      Alert.alert('Unable to Post Comment', 'Please make sure all fields are filled and you are logged in.', [{ text: 'OK' }]);
      return;
    }
  
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (!userInfoString) {
        console.error('User info not found');
        return;
      }
      const { firstName, lastName } = JSON.parse(userInfoString);
      const formattedName = formatUserName(firstName, lastName);
  
      await addDoc(collection(firestore, 'comments'), {
        text: newCommentText,
        docID: itemId,
        createdBy: formattedName, 
        createdAt: Timestamp.fromDate(new Date()),
      });
  
      setNewCommentText('');
      fetchComments(); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  
  const handleDeleteComment = async (commentId) => {
    try {
      const commentRef = doc(firestore, 'comments', commentId);
      await deleteDoc(commentRef);
      console.log(`Deleted comment with id: ${commentId}`);
  
      fetchComments(); 
    } catch (error) {
      console.error('Error deleting comment:', error);
      Alert.alert('Error', 'Failed to delete the comment.');
    }
  };

  const fetchComments = async () => {
    const q = query(collection(firestore, 'comments'), where('docID', '==', itemId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedComments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Comments:", fetchedComments);
    setComments(fetchedComments);
  };

  const formatUserName = (firstName, lastName) => {
    const lastNameInitial = lastName ? `${lastName.charAt(0).toUpperCase()}.` : '';
    return `${firstName} ${lastNameInitial}`;
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <>
      <Text style={styles.sectionHeader}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
            <Text style={styles.commentAuthor}>{item.createdBy}</Text>
            <Text style={styles.commentDate}>{formatDate(item.createdAt)}</Text>
              {item.createdBy === currentUserEmail && (
                <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                  <Ionicons name="trash-bin-outline" size={20} style={styles.deleteButton} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />

    <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        placeholder={isLoadingUser ? "Loading user info..." : "Add a comment..."}
        value={newCommentText}
        onChangeText={setNewCommentText}
        multiline
        editable={!isLoadingUser}
    />
    <TouchableOpacity 
        style={[styles.button, isLoadingUser && styles.buttonDisabled]} 
        onPress={handleAddComment}
        disabled={isLoadingUser}
    >
        <Text style={styles.buttonText}>Post</Text>
    </TouchableOpacity>
    </View>
      </>
  );
};

export default CommentsSection;