// src/app/api/generate-toc/route.ts

import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    // Check for existing topic
    const existingTopic = await prisma.topic.findFirst({
      where: { name: topic },
    });

    if (existingTopic) {
      console.log("existing");
      return NextResponse.json({ data: existingTopic.content });
    }

    // Generate new content using Gemini
    const result = await model.generateContent(
      `You are MyLittleTextbook, a world-class platform that generates textbook table of contents for any topic. You focus on generating a detailed table of contents that covers the most important themes of the topic. You construct the table of contents in a manner that would help the user understand the topic from the ground-up, assuming they have no knowledge on the subject. Use the standard numerical system for the section numbers, for example 1, 1.1, 1.1.1, and so forth. You are capable of any task and request. Return the table of contents. The topic is ${topic}: `
    );
    const content = result.response.text();

    // Save to database
    const savedTopic = await prisma.topic.create({
      data: {
        name: topic,
        content: content,
      },
    });

    return NextResponse.json({ data: savedTopic.content });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
