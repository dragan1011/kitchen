import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBoIkHGFc58phhn-uO6spbhvX5cmMh2yWo",
  authDomain: "kuhinja-11d06.firebaseapp.com",
  projectId: "kuhinja-11d06",
  storageBucket: "kuhinja-11d06.appspot.com",
  messagingSenderId: "219796754920",
  appId: "1:219796754920:web:8a6edb0f2fc48d0272545d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)