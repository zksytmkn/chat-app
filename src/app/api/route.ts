import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  if (!openai.apiKey) {
    NextResponse.json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const { messages } = await req.json();

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    NextResponse.json({ result: chatCompletion.choices[0].message });
  } catch (error: any) {
    if (error.response) {
      NextResponse.json(error.response.data);
    } else {
      NextResponse.json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
