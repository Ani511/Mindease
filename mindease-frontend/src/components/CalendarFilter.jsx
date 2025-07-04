import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarFilter = ({ entries, onFilter }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const selected = date.toISOString().split("T")[0];

    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.timestamp).toISOString().split("T")[0];
      return entryDate === selected;
    });

    onFilter(filtered);
  };

  const handleReset = () => {
    setSelectedDate(null);
    onFilter(entries); // show all again
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2 text-center">🗓️ Filter by Date</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <button
        className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded block mx-auto"
        onClick={handleReset}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default CalendarFilter;
