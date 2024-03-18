
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  getDocs,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";



const firebaseConfig = {
  apiKey: "AIzaSyCnec66EL6kQl-wi1auB0VIBOIT90AYBIk",
  authDomain: "social-media-d5cb9.firebaseapp.com",
  projectId: "social-media-d5cb9",
  storageBucket: "social-media-d5cb9.appspot.com",
  messagingSenderId: "615556158",
  appId: "1:615556158:web:48b1a80a5a991073311d6f",
  measurementId: "G-C77GC5PK8T"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();




const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  deleteDoc,
  ref,
  storage,
  getDownloadURL,
  uploadBytes,
  serverTimestamp
};