// src/components/Header.jsx
import React from "react";
import { User } from "lucide-react";
import { signOut } from "../utils/auth";

export default function Header({ user, onOpenSignIn }) {
  return (
    <header className="flex items-center justify-between max-w-5xl mx-auto py-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">MindfulConnect</h2>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700">Hi, {user.displayName || user.email}</div>
            <button onClick={() => signOut()} className="px-3 py-1 rounded-xl bg-gray-200 text-sm">Sign out</button>
          </div>
        ) : (
          <button onClick={() => onOpenSignIn && onOpenSignIn()} className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-200">
            <User size={16} /> Sign in
          </button>
        )}
      </div>
    </header>
  );
}
