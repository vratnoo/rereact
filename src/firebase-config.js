// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFiKy9gFpxr6ugYRk9gyI3afO9J6I_E2E",
  authDomain: "vratnoo-21ab5.firebaseapp.com",
  databaseURL: "https://vratnoo-21ab5.firebaseio.com",
  projectId: "vratnoo-21ab5",
  storageBucket: "vratnoo-21ab5.appspot.com",
  messagingSenderId: "8425014475",
  appId: "1:8425014475:web:fa8e38b138a0c9f7cec74e",
  measurementId: "G-6C3FHJMV11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
const analytics = getAnalytics(app);