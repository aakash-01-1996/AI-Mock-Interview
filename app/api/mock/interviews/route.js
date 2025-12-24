import { NextResponse } from "next/server";
import { mockDB } from "@/utils/mockData";

// GET - Get all interviews
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("email") || "test@example.com";

  const interviews = mockDB.getInterviews(userEmail);
  return NextResponse.json(interviews);
}

// POST - Create new interview
export async function POST(request) {
  try {
    const body = await request.json();
    const result = mockDB.createInterview(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 }
    );
  }
}
