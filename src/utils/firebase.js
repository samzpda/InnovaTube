import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getRemoteConfig } from 'firebase/remote-config';
import { getPerformance } from 'firebase/performance';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrWO4jFesGbW3Rvw_7p3KBjfjh47RNeLk",
  authDomain: "innovatu-39ffe.firebaseapp.com",
  databaseURL: "https://innovatu-39ffe-default-rtdb.firebaseio.com",
  projectId: "innovatu-39ffe",
  storageBucket: "innovatu-39ffe.appspot.com",
  messagingSenderId: "729017413878",
  appId: "1:729017413878:web:5002faf00d80ae63fb3cd7",
  measurementId: "G-7SVXG4ZF6F"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
const performance = getPerformance(app);

export { auth, firestore, functions, messaging, storage, analytics, remoteConfig, performance };