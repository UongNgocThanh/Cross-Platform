// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArB9h83F1EHbRkuKVf7jAWbWgriC3508E",
  authDomain: "dacn1-travelapp.firebaseapp.com",
  projectId: "dacn1-travelapp",
  storageBucket: "dacn1-travelapp.firebasestorage.app",
  messagingSenderId: "154343691851",
  appId: "1:154343691851:web:001be0832ef150381bdfce",
  measurementId: "G-TCLKPXY3X5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
