import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const moodToScore = {
  positive: 1,
  neutral: 0,
  negative: -1,
};

const scoreToMood = {
  1: "positive",
  0: "neutral",
  [-1]: "negative",
};

const MoodChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/journal/entries")
      .then((res) => {
        const formatted = res.data
          .map((entry) => ({
            mood: moodToScore[entry.sentiment],
            date: new Date(entry.timestamp).toLocaleDateString(),
          }))
          .reverse();
        setData(formatted);
      })
      .catch((err) => console.error("Failed to fetch chart data", err));
  }, []);

  return (
    <div className="bg-white rounded p-4 mt-10 max-w-3xl mx-auto shadow">
      <h2 className="text-xl font-bold mb-4 text-center">📈 Mood Trend</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis
              domain={[-1, 1]}
              ticks={[-1, 0, 1]}
              tickFormatter={(val) => scoreToMood[val]}
            />
            <Tooltip
              formatter={(value) => scoreToMood[value]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MoodChart;
