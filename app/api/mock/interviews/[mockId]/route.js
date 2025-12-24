import { NextResponse } from "next/server";
import { mockDB } from "@/utils/mockData";

// GET - Get single interview by mockId
export async function GET(request, { params }) {
  const mockId = params.mockId;
  const interview = mockDB.getInterview(mockId);

  if (!interview) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  return NextResponse.json(interview);
}
