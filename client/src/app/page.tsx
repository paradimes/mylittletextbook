// src/app/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import TableOfContents from "@/components/TableOfContents";
import { TableOfContents as TOC } from "@/types";

export interface TopicResponse {
  id: string;
  name: string;
  content: TOC;
}

export default function Home() {
  const [topic, setTopic] = useState<TopicResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // console.log("topic: TopicResponse", topic);

  const handleTopicGeneration = async (data: TopicResponse) => {
    setTopic(data);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold">MyLittleTextbook</h1>
        <p className="mb-8 text-gray-600">
          Generate comprehensive learning materials for any topic. Enter a
          subject to get started.
        </p>

        <SearchForm onResults={handleTopicGeneration} />

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {topic && (
          <div className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {topic.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Select sections below to generate detailed content.
              </p>
            </div>

            <TableOfContents topicId={topic.id} content={topic.content} />
          </div>
        )}
      </div>
    </main>
  );
}
