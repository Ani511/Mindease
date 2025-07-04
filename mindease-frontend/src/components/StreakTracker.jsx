import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const StreakTracker = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/journal/entries")
      .then((res) => {
        const dates = res.data.map(entry => dayjs(entry.created_at).format("YYYY-MM-DD"));
        const unique = [...new Set(dates)].sort().reverse();
        let count = 0;
        let today = dayjs();

        for (let i = 0; i < unique.length; i++) {
          if (unique[i] === today.subtract(i, 'day').format("YYYY-MM-DD")) {
            count++;
          } else {
            break;
          }
        }

        setStreak(count);
      })
      .catch((err) => console.error("Streak error:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2 className="text-xl font-semibold mb-2">🔥 Current Streak</h2>
      <p className="text-3xl font-bold">{streak} day{streak !== 1 ? 's' : ''}</p>
    </div>
  );
};

export default StreakTracker;
