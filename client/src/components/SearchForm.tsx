"use client";

import { useState } from "react";

export default function SearchForm({
  onResults,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResults: (data: any) => void;
}) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate-toc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.data) {
        onResults(data.data);
      } else {
        setError("Unable to get topic info");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="flex-1 rounded-md border p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
}
