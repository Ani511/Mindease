import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/entries', { content });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Something went wrong." });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Write your journal entry..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Analyze Mood
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100 text-center">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <p><strong>ID:</strong> {result.id}</p>
              <p><strong>Mood:</strong> {result.sentiment}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
