// import * as  firebase from "firebase/app";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNGOchGZRjSkpOp6bMs1YhP7hcIDtbnN4",
  authDomain: "schedoo-de45c.firebaseapp.com",
  projectId: "schedoo-de45c",
  storageBucket: "schedoo-de45c.appspot.com",
  messagingSenderId: "28578405827",
  appId: "1:28578405827:web:94e67b5a072b2da955f176"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };


