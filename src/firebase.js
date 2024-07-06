import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyALn7UaRu0Tm4i61xDgMTKJlN9LJdmAvBE",
    authDomain: "twitterclone-ed8a3.firebaseapp.com",
    projectId: "twitterclone-ed8a3",
    storageBucket: "twitterclone-ed8a3.appspot.com",
    messagingSenderId: "954653079305",
    appId: "1:954653079305:web:725e9b08a29f6441fb45d8",
    measurementId: "G-MQQKZX1XY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
const dB = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { dB, storage, auth, analytics };