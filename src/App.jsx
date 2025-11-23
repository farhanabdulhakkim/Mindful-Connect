import { useState } from "react";
import Header from "./components/Header";
import MoodSurvey from "./components/MoodSurvey";
import AnalysisLoader from "./components/AnalysisLoader";
import RecommendationCard from "./components/RecommendationCard";
import HistoryLog from "./components/HistoryLog";
import { analyzeMood } from "./utils/analyzeMood";
import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export default function App() {
  const [phase, setPhase] = useState("survey");
  const [results, setResults] = useState(null);

  const handleSurvey = async ({ mood, note }) => {
    setPhase("loading");

    const analysis = analyzeMood(note);

    await addDoc(collection(db, "moodLogs"), {
      mood,
      note,
      time: new Date().toLocaleString()
    });

    setTimeout(() => {
      setResults(analysis);
      setPhase("recommendation");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <Header />

      {phase === "survey" && <MoodSurvey onSubmit={handleSurvey} />}
      {phase === "loading" && <AnalysisLoader />}

      {phase === "recommendation" && results && (
        <div className="max-w-xl mx-auto space-y-4 mt-6">
          <RecommendationCard title="Connection" text={results.connection} />
          <RecommendationCard title="Physical" text={results.physical} />
          <RecommendationCard title="Mental" text={results.mental} />
        </div>
      )}

      <HistoryLog />
    </div>
  );
}
