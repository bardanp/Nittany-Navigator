// firebase.js
import { firebaseConfig } from '../keys.json'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; 

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app);

export { firestore, storage, auth };
