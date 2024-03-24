// firebase.js
import { firebaseConfig } from '../keys.json';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { firestore, storage, auth };
