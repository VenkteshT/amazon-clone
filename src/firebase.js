// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXfsIKBlRAv7HMxXskVrfvwtdfhpeOJec",
  authDomain: "clone-87a81.firebaseapp.com",
  projectId: "clone-87a81",
  storageBucket: "clone-87a81.appspot.com",
  messagingSenderId: "1047836884393",
  appId: "1:1047836884393:web:4d5af902b669a9f0de58b8",
  measurementId: "G-BBF7W05C75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth };
