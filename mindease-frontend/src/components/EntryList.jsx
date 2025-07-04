import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarFilter from "./CalendarFilter";
import MoodFilter from "./MoodFilter"

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/journal/entries")
      .then((res) => {
        const data = res.data.reverse();
        setEntries(data);
        setFilteredEntries(data);
      })
      .catch((err) => console.error("Failed to fetch entries", err));
  }, []);

  const getEmoji = (sentiment) => {
    switch (sentiment) {
      case "positive": return "😊";
      case "negative": return "😞";
      case "neutral": return "😐";
      default: return "📝";
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const handleMoodChange = (selectedMood) => {
    if (selectedMood === "all") {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter(entry => entry.sentiment === selectedMood);
      setFilteredEntries(filtered);
    }
  };

  return (
    <>
      <CalendarFilter entries={entries} onFilter={setFilteredEntries} />
      <MoodFilter onMoodChange={handleMoodChange} />
      <div className="bg-white rounded p-4 mt-10 max-w-xl mx-auto shadow">
        <h2 className="text-xl font-bold mb-4 text-center">📓 Journal Entries</h2>
        {filteredEntries.length === 0 ? (
          <p className="text-center text-gray-500">No entries for selected date.</p>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="border-b py-2">
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              <div className="text-sm text-gray-500 mt-1 flex justify-between items-center">
                <span>Mood: <strong>{getEmoji(entry.sentiment)} {entry.sentiment}</strong></span>
                <span>{formatDate(entry.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default EntryList;
