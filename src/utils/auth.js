// src/utils/auth.js
import {
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signOut = () => fbSignOut(auth);

export const observeAuth = (cb) => {
  return onAuthStateChanged(auth, cb);
};

export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
