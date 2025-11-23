import { useState } from "react";

const emojis = [
  { label: "Happy", symbol: "😊" },
  { label: "Neutral", symbol: "😐" },
  { label: "Sad", symbol: "😔" },
  { label: "Angry", symbol: "😡" },
  { label: "Anxious", symbol: "😰" }
];

export default function MoodSurvey({ onSubmit }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!mood) return alert("Please select how you feel.");
    onSubmit({ mood, note });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        How are you feeling right now?
      </h2>

      <div className="flex justify-between mb-4">
        {emojis.map((e) => (
          <button
            key={e.label}
            onClick={() => setMood(e.label)}
            className={`text-3xl p-3 rounded-xl transition 
              ${mood === e.label ? "bg-blue-200" : "bg-gray-100"}`}
          >
            {e.symbol}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Describe what’s going on..."
        className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl"
      >
        Submit
      </button>
    </div>
  );
}
