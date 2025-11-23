import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDnBh0SVjggw6INxsqgGAG_psDq6_wz5wQ",
  authDomain: "mindfulconnect-70d87.firebaseapp.com",
  projectId: "mindfulconnect-70d87",
  storageBucket: "mindfulconnect-70d87.firebasestorage.app",
  messagingSenderId: "663918502968",
  appId: "1:663918502968:web:0d881cc207ae3a968e72cd",
  measurementId: "G-2LQM7ZRWM7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);