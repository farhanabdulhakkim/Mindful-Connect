// src/pages/MainApp.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import MoodSurvey from "../components/MoodSurvey";
import AnalysisLoader from "../components/AnalysisLoader";
import RecommendationCard from "../components/RecommendationCard";
import HistoryLog from "../components/HistoryLog";
import BreathingCircle from "../components/BreathingCircle";
import { analyzeMood } from "../utils/analyzeMood";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MainApp({ user, onOpenSignIn }) {
  const [phase, setPhase] = useState("survey");
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleSurvey = async ({ mood, note }) => {
    setPhase("loading");
    const analysis = analyzeMood(note);

    // store under user if logged in
    const baseRef = user ? `users/${user.uid}/moodLogs` : "moodLogs";
    await addDoc(collection(db, baseRef), {
      mood,
      note,
      time: new Date().toLocaleString(),
      sentiment: analysis.analysis.sentimentLabel,
      confidence: analysis.analysis.confidence,
      uid: user ? user.uid : null
    });

    setTimeout(() => {
      setResults(analysis);
      setPhase("recommendation");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <Header user={user} onOpenSignIn={onOpenSignIn} />
      {phase === "survey" && <MoodSurvey onSubmit={handleSurvey} />}
      {phase === "loading" && <AnalysisLoader />}

      {phase === "recommendation" && results && (
        <div className="max-w-xl mx-auto space-y-4 mt-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-700">
              <span className="font-semibold">Sentiment:</span>{" "}
              {results.analysis.sentimentLabel}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Confidence:</span>{" "}
              {results.analysis.confidence}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Primary Recommendation:</span>{" "}
              {results.primarySuggestion}
            </p>
          </div>

          {results.primarySuggestion.includes("breath") ? (
            <BreathingCircle />
          ) : null}

          <RecommendationCard title="Connection" text={results.connection} />
          <RecommendationCard title="Physical" text={results.physical} />
          <RecommendationCard title="Mental" text={results.mental} />
        </div>
      )}

      <HistoryLog />
    </div>
  );
}
