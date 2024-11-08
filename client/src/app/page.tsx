// src/app/page.tsx

"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import TableOfContents from "@/components/TableOfContents";
// import TableOfContents from "@/components/TableOfContents";

export default function Home() {
  const [content, setContent] = useState<string | null>(null);
  console.log("content", content);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">FUNdamentals 2.0</h1>
      <SearchForm onResults={setContent} />
      {content && <TableOfContents content={content} />}
      {/* {content && <div>TOC</div>} */}
    </main>
  );
}
