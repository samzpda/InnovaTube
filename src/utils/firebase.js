import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrWO4jFesGbW3Rvw_7p3KBjfjh47RNeLk",
    authDomain: "innovatu-39ffe.firebaseapp.com",
    projectId: "innovatu-39ffe",
    storageBucket: "innovatu-39ffe.appspot.com",
    messagingSenderId: "729017413878",
    appId: "1:729017413878:web:5002faf00d80ae63fb3cd7",
    measurementId: "G-7SVXG4ZF6F"
  };

  firebase.initializeApp(firebaseConfig);

//utils
const auth = firebase.auth();

export { auth };