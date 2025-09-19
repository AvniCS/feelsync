// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEO0mWmZ-OsF5C20dYA3skvtsEHCauHBM",
  authDomain: "feelsync-c188b.firebaseapp.com",
  projectId: "feelsync-c188b",
  storageBucket: "feelsync-c188b.firebasestorage.app",
  messagingSenderId: "964378733052",
  appId: "1:964378733052:web:550da86894fc11dc49aa79"
  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
