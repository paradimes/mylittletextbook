/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/generate-toc/route.ts

import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { TableOfContents, toPrismaJson } from "@/types";

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    const normalizedTopic = topic.toLowerCase().trim();

    // Check for existing topic (case-insensitive)
    const existingTopic = await prisma.topic.findFirst({
      where: {
        name: {
          equals: normalizedTopic,
          mode: "insensitive",
        },
      },
    });

    if (existingTopic) {
      return NextResponse.json({
        id: existingTopic.id,
        name: existingTopic.name,
        content: existingTopic.content,
      });
    }

    const prompt = `Generate a detailed table of contents for a textbook about "${topic}".

Return your response as a JSON object with the following structure:
{
  "topic": "Complete topic title",
  "sections": [
    {
      "id": "1",
      "title": "Main section title",
      "children": [
        {
          "id": "1.1",
          "title": "Subsection title",
          "children": [
            {
              "id": "1.1.1",
              "title": "Sub-subsection title"
            }
          ]
        }
      ]
    }
  ]
}

Requirements:
- Use exactly 3 levels of depth maximum
- Include 5-10 main sections (level 1)
- Number sections hierarchically (1, 1.1, 1.1.1)
- Focus on creating a logical learning progression
- Ensure section titles are clear and descriptive
- Return valid JSON only, no additional text or explanation

Structure the content to help a beginner learn ${topic} effectively, starting with fundamentals and progressing to more advanced concepts.`;

    // Generate new content using Gemini
    const result = await model.generateContent(prompt);
    const tocJSON = result.response.text();

    // Parse and validate the JSON
    const toc: TableOfContents = JSON.parse(tocJSON);

    // Save to database
    const savedTopic = await prisma.topic.create({
      data: {
        name: topic,
        content: toPrismaJson(toc), // Convert to Prisma-compatible JSON
      },
    });

    return NextResponse.json({
      id: savedTopic.id,
      name: savedTopic.name,
      content: toc,
    });
  } catch (error) {
    console.error("Error generating TOC:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
