import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { firestore } from '../../../backend/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { collection, query, where, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CommentsSection.styles';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

const CommentsSection = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [addError, setAddError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadCommentsError, setLoadCommentsError] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  useEffect(() => {
    const fetchCurrentUserEmail = async () => {
      setIsLoadingUser(true);
      const userInfoString = await AsyncStorage.getItem('userInfo');
      console.log("User Info String:", userInfoString);
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setCurrentUserEmail(userInfo.email);
      }
      setIsLoadingUser(false);
    };

    fetchCurrentUserEmail();
  }, []);

  useEffect(() => {
    setLoadingComments(true);
    setLoadCommentsError('');
    if (itemId) {
      const fetchComments = async () => {
        try {
          const q = query(collection(firestore, 'comments'), where('docID', '==', itemId), orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          const fetchedComments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(fetchedComments);
        } catch (error) {
          console.error('Error loading comments:', error);
          setLoadCommentsError('Failed to load comments. Please try again.');
        }
        setLoadingComments(false);
      };
      fetchComments();
    }
  }, [itemId]);

  const handleAddComment = async () => {
    setAddError('');
    if (!newCommentText.trim() || !itemId) {
      setAddError('You cannot post an empty comment. Please try again.');
      return;
    }

    if (newCommentText.trim().length >= 250){
      Alert.alert("The text is too long, please only use a maximum of 250 characters.")
      return;
    }

    setIsPostingComment(true);
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
        creatorEmail: currentUserEmail,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setNewCommentText('');
      fetchComments();
    } catch (error) {
      setAddError('Failed to post the comment. Please try again.');
    }
    Alert.alert('Comment added successfully');
    setIsPostingComment(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(firestore, 'comments', commentId));
      Alert.alert('Comment deleted successfully');
      fetchComments();
    } catch (error) {
      setDeleteError('Failed to delete the comment. Please try again.');
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
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isLoadingUser ? "Loading user info..." : addError || "Add a comment..."}
          value={newCommentText}
          onChangeText={setNewCommentText}
          multiline
          editable={!isLoadingUser}
        />
        <TouchableOpacity
        style={[styles.button, (isLoadingUser || isPostingComment) && styles.buttonDisabled]}
          onPress={handleAddComment}
          disabled={isLoadingUser || isPostingComment}
        >
        {isPostingComment ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Post</Text>
        )}
        </TouchableOpacity>
      </View>
      {loadingComments ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : comments.length > 0 ? (
        <FlatList
        contentContainerStyle={{ paddingHorizontal: 0 }}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{item.createdBy}</Text>
                {item.creatorEmail === currentUserEmail && (
                  <TouchableOpacity onPress={() => handleDeleteComment(item.id)} style={styles.deleteButton}>
                    <Ionicons name="trash-bin" size={20} color="red" />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
              <Text style={styles.commentDate}>{item.createdAt.toDate().toLocaleString()}</Text>
            </View>
          )}
          style={{ flex: 1 }}
        />
      ) : loadCommentsError ? (
        <Text style={styles.errorText}>{loadCommentsError}</Text>
      ) : (
        <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
      )}
      {deleteError && Alert.alert('Error', deleteError)}
    </View>
  );
};

export default CommentsSection;