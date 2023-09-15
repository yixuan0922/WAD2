import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDNGOchGZRjSkpOp6bMs1YhP7hcIDtbnN4",
    authDomain: "schedoo-de45c.firebaseapp.com",
    projectId: "schedoo-de45c",
    storageBucket: "schedoo-de45c.appspot.com",
    messagingSenderId: "28578405827",
    appId: "1:28578405827:web:466fe445b1bd596d55f176"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp; 

export {timestamp};
export default firebaseApp.firestore();