import { initializeApp } from "firebase/app";
import firestore from "firebase/firestore";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "stockx-8f39d.firebaseapp.com",
  projectId: "stockx-8f39d",
  storageBucket: "stockx-8f39d.appspot.com",
  messagingSenderId: "9555832321",
  appId: "1:9555832321:web:220d72997d2db404b39a00",
  measurementId: "G-557EMTNPKH"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export { firebase, firebaseConfig, firestore };