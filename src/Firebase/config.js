// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoBhJE7Kvw0LtvRNsk4k2Npd3qPqrJ8Bo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: "dolist-67497",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:339246218710:web:03f7f8416737a0aab13877",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;


const db = getFirestore();
export{db}