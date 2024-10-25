import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSlhmvtW2GxMBFgA8t3ukwKunf_nAtG44",
  authDomain: "mumbaihacks24.firebaseapp.com",
  projectId: "mumbaihacks24",
  storageBucket: "mumbaihacks24.appspot.com",
  messagingSenderId: "88597207426",
  appId: "1:88597207426:web:1f913b224794f9ce3bd79b",
  measurementId: "G-VJV18YC87F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
