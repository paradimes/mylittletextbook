// src/components/TableOfContents.tsx

"use client";

import { useState } from "react";

import { SectionContent } from "./SectionContent";
import { Section, TableOfContents as TOC } from "@/types";

interface TableOfContentsProps {
  topicId: string;
  content: TOC;
}

export default function TableOfContents({
  topicId,
  content,
}: TableOfContentsProps) {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = async (section: Section) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId,
          section: {
            id: section.id,
            title: section.title,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      setSelectedSection({ ...section, content: data.content });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderSection = (section: Section, depth: number = 0) => (
    <div key={section.id} className={`pl-${depth * 4} py-1`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500">{section.id}</span>
        <span className="flex-1">{section.title}</span>
        {!section.children?.length && (
          <button
            onClick={() => handleGenerateContent(section)}
            disabled={isGenerating}
            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        )}
      </div>
      {section.children?.map((child) => renderSection(child, depth + 1))}
    </div>
  );

  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">{content.topic}</h2>
        <div className="space-y-2 ">
          {content.sections.map((section) => renderSection(section))}
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {selectedSection?.content && (
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm bg-neutral-200">
          <h2 className="mb-4 text-xl font-semibold text-black">
            {selectedSection.id} {selectedSection.title}
          </h2>
          <SectionContent content={selectedSection.content} />
        </div>
      )}
    </div>
  );
}
