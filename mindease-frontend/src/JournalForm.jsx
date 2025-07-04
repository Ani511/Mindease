import React, { useState } from "react";
import axios from "axios";

const JournalForm = () => {
  const [entry, setEntry] = useState("");
  const [textblobMood, setTextblobMood] = useState("");
  const [modelMood, setModelMood] = useState("");
  const [modelConfidence, setModelConfidence] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/journal/entries", {
        content: entry,
      });
      alert("Entry saved! Mood: " + res.data.sentiment);
      setEntry("");
      setTextblobMood("");
      setModelMood("");
      setModelConfidence("");
    } catch (err) {
      alert("Failed to save entry");
      console.error("Backend error:", err?.response?.data || err.message);
    }
  };

  const analyzeMood = async () => {
    try {
      const res = await axios.post("http://localhost:8000/journal/analyze", {
        content: entry,
      });
      setTextblobMood(res.data.sentiment);
      setModelMood(res.data.model_sentiment);
      setModelConfidence(res.data.model_confidence);
    } catch (err) {
      alert("Mood analysis failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto mt-10">
      <textarea
        className="w-full p-4 border border-gray-300 rounded resize-none h-48"
        placeholder="Write your thoughts here..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        required
      />

      {textblobMood && (
        <div className="bg-gray-100 p-4 rounded text-center text-lg">
          <p>🧠 <strong>TextBlob Mood:</strong> {textblobMood}</p>
          {modelMood && modelConfidence !== "" && (
            <p>🤖 <strong>BERT Mood:</strong> {modelMood} ({(modelConfidence * 100).toFixed(1)}% confidence)</p>
          )}
        </div>
      )}


      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={analyzeMood}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Analyze Mood
        </button>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
};

export default JournalForm;
