import React from "react";

const MoodFilter = ({ onMoodChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <select
        className="border border-gray-300 p-2 rounded text-gray-700"
        onChange={(e) => onMoodChange(e.target.value)}
      >
        <option value="all">All Moods</option>
        <option value="positive">😊 Positive</option>
        <option value="neutral">😐 Neutral</option>
        <option value="negative">😞 Negative</option>
      </select>
    </div>
  );
};

export default MoodFilter;
