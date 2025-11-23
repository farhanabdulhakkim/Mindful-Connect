// src/utils/sentimentAnalyze.js
import Sentiment from "sentiment";

/**
 * analyzeText: returns { score, comparative, sentimentLabel, categories }
 * categories: flags like lonely/overwhelmed/anxious detected by keyword+score heuristics.
 */
const sentiment = new Sentiment();

const KEYWORD_MAP = [
  { key: "lonely", category: "connection" },
  { key: "alone", category: "connection" },
  { key: "sad", category: "mental" },
  { key: "overwhelmed", category: "mental" },
  { key: "anxious", category: "mental" },
  { key: "tired", category: "physical" },
  { key: "pain", category: "physical" },
  { key: "stiff", category: "physical" },
  // add more as needed
];

export function analyzeText(text) {
  const res = sentiment.analyze(text || "");
  const score = res.score; // integer
  const comparative = res.comparative; // normalized
  // sentiment label
  const sentimentLabel =
    comparative > 0.5 ? "very_positive" :
    comparative > 0.1 ? "positive" :
    comparative < -0.5 ? "very_negative" :
    comparative < -0.1 ? "negative" :
    "neutral";

  // detect categories
  const lower = (text || "").toLowerCase();
  const categories = {};
  KEYWORD_MAP.forEach(k => {
    if (lower.includes(k.key)) categories[k.category] = (categories[k.category]||0) + 1;
  });

  // fallback heuristics: pick highest category or infer from score
  let mainCategory = null;
  if (Object.keys(categories).length) {
    mainCategory = Object.keys(categories).reduce((a,b) => categories[a] > categories[b] ? a : b);
  } else {
    if (comparative <= -0.2) mainCategory = "mental";
    else if (lower.match(/\b(pain|ache|tired|stiff)\b/)) mainCategory = "physical";
    else mainCategory = "connection";
  }

  // a confidence estimate (0-1) - simple function for now
  const confidence = Math.min(1, Math.abs(comparative) + (Object.keys(categories).length * 0.15));

  return {
    score,
    comparative,
    sentimentLabel,
    mainCategory,
    categories,
    confidence: Number(confidence.toFixed(2))
  };
}
