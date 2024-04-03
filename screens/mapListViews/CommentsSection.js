import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../../backend/firebase';
import { collection, query, where, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentsSection = ({ itemId }) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    useEffect(() => {
        const fetchCurrentUserEmail = async () => {
            const userInfoString = await AsyncStorage.getItem('userInfo');
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                setCurrentUserEmail(userInfo.email);
            }
        };

        fetchCurrentUserEmail();
        if (itemId) {
            fetchComments();
        }
    }, [itemId]);

    useEffect(() => {
        console.log("Fetching comments for item ID:", itemId);
        // rest of your code
    }, [itemId]);
    

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
    

    const handleAddComment = async () => {
        if (!newCommentText.trim()) return;
        await addDoc(collection(firestore, 'comments'), {
            text: newCommentText,
            docID: itemId,
            createdBy: currentUserEmail,
            createdAt: Timestamp.fromDate(new Date()),
        });
        setNewCommentText('');
        fetchComments();
    };

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentAuthor}>{item.createdBy}</Text>
                        <Text style={styles.commentText}>{item.text}</Text>
                        <Text style={styles.commentDate}>{formatDate(item.createdAt)}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment..."
                    value={newCommentText}
                    onChangeText={setNewCommentText}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 10 },
    commentContainer: { backgroundColor: '#f0f2f5', padding: 10, borderRadius: 5, marginBottom: 10 },
    commentAuthor: { fontWeight: 'bold' },
    commentText: { fontSize: 16, marginTop: 4 },
    commentDate: { fontSize: 12, marginTop: 4, color: '#666', textAlign: 'right' },
    inputContainer: { flexDirection: 'row', marginTop: 10 },
    input: { flex: 1, borderColor: '#ccc', borderWidth: 1, marginRight: 10, borderRadius: 5, padding: 10 },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
    buttonText: { color: '#ffffff' },
});

export default CommentsSection;
