export function analyzeMood(text) {
  const lower = text.toLowerCase();

  let connection = "Talk to a friend or loved one.";
  let physical = "Do a light stretch.";
  let mental = "Try 2 minutes of breathing.";

  if (lower.includes("lonely")) connection = "Call someone you trust.";
  if (lower.includes("sad")) mental = "Try a calming music playlist.";
  if (lower.includes("tired")) physical = "Try a quick relaxation stretch.";
  if (lower.includes("overwhelmed")) mental = "Do a guided deep breathing session.";
  if (lower.includes("anxious")) mental = "Try a grounding exercise (5-4-3-2-1).";
  if (lower.includes("pain") || lower.includes("stiff"))
    physical = "Neck & shoulder stretch (30 seconds).";

  return { connection, physical, mental };
}
