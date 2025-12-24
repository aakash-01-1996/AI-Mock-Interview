import { NextResponse } from "next/server";
import { mockDB } from "@/utils/mockData";

// GET - Get feedback for an interview
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mockId = searchParams.get("mockId");
  const userEmail = searchParams.get("email");

  if (mockId) {
    const feedback = mockDB.getFeedback(mockId);
    return NextResponse.json(feedback);
  }

  if (userEmail) {
    const answers = mockDB.getUserAnswers(userEmail);
    return NextResponse.json(answers);
  }

  return NextResponse.json([]);
}

// POST - Save user answer
export async function POST(request) {
  try {
    const body = await request.json();
    const result = mockDB.saveUserAnswer(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save answer" },
      { status: 500 }
    );
  }
}
