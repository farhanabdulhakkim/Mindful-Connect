import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function HistoryLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "moodLogs"));
      const arr = [];
      snap.forEach((d) => arr.push(d.data()));
      setLogs(arr.reverse());
    }
    load();
  }, []);

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        Your Mood History
      </h2>

      {logs.map((log, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow mb-3">
          <p className="font-medium">Mood: {log.mood}</p>
          <p className="text-gray-600">Note: {log.note}</p>
          <p className="text-gray-400 text-sm mt-1">{log.time}</p>
        </div>
      ))}
    </div>
  );
}
