// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainApp from "./pages/MainApp";
import SignInModal from "./components/SignInModal";
import { observeAuth } from "./utils/auth";
import { AnimatePresence, motion } from "framer-motion";

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const unsub = observeAuth((u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<LandingPage onBegin={() => window.location.href = "/app"} onOpenSignIn={() => setShowSignIn(true)} />} />
        <Route path="/app" element={<MainApp user={user} onOpenSignIn={() => setShowSignIn(true)} />} />
      </Routes>
    </>
  );
}
