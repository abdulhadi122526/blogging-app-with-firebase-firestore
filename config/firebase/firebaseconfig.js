import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDIOoZZAuYvrzHQFv3RzGC9lKLpK1AFMuk",
    authDomain: "personal-blogging-app-b9522.firebaseapp.com",
    projectId: "personal-blogging-app-b9522",
    storageBucket: "personal-blogging-app-b9522.firebasestorage.app",
    messagingSenderId: "369230604143",
    appId: "1:369230604143:web:0376529bc22fa083322a9a",
    measurementId: "G-199687WW77"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
