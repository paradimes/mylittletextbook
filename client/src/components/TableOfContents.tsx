"use client";

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-blue-300 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Table of Contents</h2>
      <div className="prose max-w-none">
        {/* Since content might be formatted in different ways by Gemini, 
            we'll preserve whitespace and line breaks */}
        <pre className="whitespace-pre-wrap font-sans">{content}</pre>
      </div>
    </div>
  );
}
