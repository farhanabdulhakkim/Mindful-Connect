// src/utils/analyzeMood.js
import { analyzeText } from "./sentimentAnalyze";

const RECOMMENDATIONS = {
  connection: "Call someone you trust or send a warm message.",
  physical: "Try a gentle neck & shoulder stretch for 30 seconds.",
  mental: "Do a guided calming 2-minute breathing exercise."
};

export function analyzeMood(note) {
  const analysis = analyzeText(note);
  const main = analysis.mainCategory;

  return {
    analysis,
    connection: RECOMMENDATIONS.connection,
    physical: RECOMMENDATIONS.physical,
    mental: RECOMMENDATIONS.mental,
    primarySuggestion:
      RECOMMENDATIONS[main] || RECOMMENDATIONS.mental
  };
}
