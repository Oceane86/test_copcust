// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrGMbNtZWFF_gVSxZqdE6Y81xoOxUke2I",
    authDomain: "marketplace-c20b2.firebaseapp.com",
    projectId: "marketplace-c20b2",
    storageBucket: "marketplace-c20b2.appspot.com",
    messagingSenderId: "766247619427",
    appId: "1:766247619427:web:014a6807e0c37a76286156",
    measurementId: "G-7J0ES2BNQD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


export { auth, db, googleProvider };
