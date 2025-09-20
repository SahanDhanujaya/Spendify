// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD--beCeA4r1UQo4ES_YH2l5rY0vQKsxzs",
  authDomain: "spendify-6465c.firebaseapp.com",
  projectId: "spendify-6465c",
  storageBucket: "spendify-6465c.firebasestorage.app",
  messagingSenderId: "521268867189",
  appId: "1:521268867189:web:abc53a9d0eed2c0e07483c",
  measurementId: "G-GBN6P3N5MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)