import React from "react";
import Moodchart from "./Moodchart";
import StreakTracker from "./StreakTracker";

const InsightsView = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">📊 Mood Insights</h1>
      
      <section className="mb-8">
        <Moodchart />
      </section>
      <section>
        <StreakTracker />
      </section>
    </div>
  );
};

export default InsightsView;
