import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JournalForm from "./components/JournalForm";
import EntryList from "./components/EntryList";
import Moodchart from "./components/Moodchart";
import InsightsView from "./components/InsightsView";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 p-8">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">MindEase Journal</h1>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/insights" className="text-white hover:underline">Insights</Link>
        </div>

        {/* Route rendering */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <JournalForm />
                <EntryList />
                <Moodchart />
              </>
            }
          />
          <Route path="/insights" element={<InsightsView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
