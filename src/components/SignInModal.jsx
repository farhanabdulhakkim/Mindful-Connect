// src/components/SignInModal.jsx
import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "../utils/auth";
import { motion } from "framer-motion";

export default function SignInModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (e) {
      console.error(e);
      alert("Google sign-in failed.");
    }
  };

  const handleEmailSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      onClose();
    } catch (e) {
      console.error(e);
      alert(e.message || "Sign up failed.");
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      onClose();
    } catch (e) {
      console.error(e);
      alert(e.message || "Sign in failed.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div initial={{ y: 30 }} animate={{ y: 0 }} className="bg-white dark:bg-gray-900 max-w-md w-full rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Sign in</h3>

        <div className="flex gap-2">
          <button onClick={handleGoogle} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl">Continue with Google</button>
        </div>

        <div className="mt-4">
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl mb-2" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-3 rounded-xl mb-2" />
          <div className="flex gap-2">
            <button onClick={handleEmailSignIn} className="flex-1 px-4 py-2 bg-gray-200 rounded-xl">Sign in</button>
            <button onClick={handleEmailSignUp} className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-xl">Create account</button>
          </div>
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm text-gray-600">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
