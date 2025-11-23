export default function RecommendationCard({ title, text }) {
  return (
    <div className="bg-blue-50 rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-blue-800">{title}</h3>
      <p className="text-gray-700 mt-2">{text}</p>
    </div>
  );
}
