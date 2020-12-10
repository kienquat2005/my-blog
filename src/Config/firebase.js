import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
const firebaseConfig = {
    apiKey: "AIzaSyCRf0b26GxYxq5OoMR-Cg15bG9AT64pkao",
    authDomain: "blog-1a8fc.firebaseapp.com",
    databaseURL: "https://blog-1a8fc.firebaseio.com",
    projectId: "blog-1a8fc",
    storageBucket: "blog-1a8fc.appspot.com",
    messagingSenderId: "1051057898239",
    appId: "1:1051057898239:web:42674bf93e91222b2a42ca",
    measurementId: "G-BQX2EV5GSV"
  };

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;