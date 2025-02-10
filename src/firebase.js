import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlvEYl1ruSqZSrmgCmmnDPs43lesCaj_I",
    authDomain: "vingle-seller-app.firebaseapp.com",
    projectId: "vingle-seller-app",
    storageBucket: "vingle-seller-app.firebasestorage.app",
    messagingSenderId: "260148810288",
    appId: "1:260148810288:web:a2b0a17b427b865517d3f5",
    measurementId: "G-Q7YB8DM1JL"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const firebaseExports  = {db, firebaseConfig}

export default firebaseExports;