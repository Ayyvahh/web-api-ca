import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {

    apiKey: "AIzaSyCO-WYrt_XtXZ1gwkHnMju7DQ67kpdSqRY",

    authDomain: "react-asgn2.firebaseapp.com",

    projectId: "react-asgn2",

    storageBucket: "react-asgn2.firebasestorage.app",

    messagingSenderId: "298217909379",

    appId: "1:298217909379:web:f9dc0b475fec6647697fb6",

    measurementId: "G-Q92WY62RTD"

};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const auth = getAuth(app);
export const firestore = getFirestore(app);
