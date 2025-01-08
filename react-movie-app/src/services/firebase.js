import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "react-assignment-1-52056.firebaseapp.com",
    projectId: "react-assignment-1-52056",
    storageBucket: "react-assignment-1-52056.firebasestorage.app",
    messagingSenderId: "925988736231",
    appId: "1:925988736231:web:8e57a5f5042a7aa985a642",
    measurementId: "G-SDH7QJ5PBW"

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
