// Mock service - use this instead of real DB/AI when testing
// Set USE_MOCK=true in .env.local to enable mock mode

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const mockService = {
  // Check if mock mode is enabled
  isEnabled: () => USE_MOCK,

  // Get all interviews
  getInterviews: async (userEmail) => {
    const res = await fetch(
      `/api/mock/interviews?email=${encodeURIComponent(userEmail)}`
    );
    return res.json();
  },

  // Get single interview
  getInterview: async (mockId) => {
    const res = await fetch(`/api/mock/interviews/${mockId}`);
    return res.json();
  },

  // Create interview
  createInterview: async (data) => {
    const res = await fetch("/api/mock/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Save answer with auto-generated feedback
  saveAnswer: async (data) => {
    const res = await fetch("/api/mock/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Get feedback
  getFeedback: async (mockId) => {
    const res = await fetch(`/api/mock/feedback?mockId=${mockId}`);
    return res.json();
  },

  // Get user answers
  getUserAnswers: async (userEmail) => {
    const res = await fetch(
      `/api/mock/feedback?email=${encodeURIComponent(userEmail)}`
    );
    return res.json();
  },
};

export default mockService;
