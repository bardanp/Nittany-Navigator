// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../keys.json'

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };