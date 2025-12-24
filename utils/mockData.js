// Mock data store - simulates database
let mockInterviews = [
  {
    id: 1,
    mockId: "mock-interview-1",
    jsonMockResp: JSON.stringify([
      {
        question: "What is React and why would you use it?",
        answer:
          "React is a JavaScript library for building user interfaces. It uses a virtual DOM for efficient updates, component-based architecture for reusability, and one-way data flow for predictable state management.",
      },
      {
        question: "Explain the difference between state and props in React.",
        answer:
          "Props are read-only data passed from parent to child components. State is mutable data managed within a component. Props flow down, state is local. Both trigger re-renders when changed.",
      },
      {
        question: "What are React hooks and name a few commonly used ones?",
        answer:
          "Hooks are functions that let you use state and lifecycle features in functional components. Common hooks: useState for state, useEffect for side effects, useContext for context, useRef for references, useMemo for memoization.",
      },
      {
        question: "How do you handle forms in React?",
        answer:
          "Forms can be controlled (React manages state via useState) or uncontrolled (DOM manages state via refs). Controlled components offer more control, validation, and predictable behavior.",
      },
      {
        question:
          "What is the virtual DOM and how does it improve performance?",
        answer:
          "The virtual DOM is a lightweight JavaScript representation of the real DOM. React compares virtual DOM snapshots (diffing) and only updates changed elements in the real DOM (reconciliation), minimizing expensive DOM operations.",
      },
    ]),
    jobPostion: "Frontend Developer",
    jobDesc: "React, JavaScript, CSS, HTML",
    jobExperience: "2",
    createdBy: "test@example.com",
    createdAt: "12-24-2025",
  },
  {
    id: 2,
    mockId: "mock-interview-2",
    jsonMockResp: JSON.stringify([
      {
        question: "What is Node.js and what are its main features?",
        answer:
          "Node.js is a JavaScript runtime built on Chrome's V8 engine. Key features: event-driven, non-blocking I/O, single-threaded with event loop, NPM ecosystem, and cross-platform support.",
      },
      {
        question: "Explain the event loop in Node.js.",
        answer:
          "The event loop handles async operations. It processes the call stack, then checks microtasks (promises), then macrotasks (setTimeout, I/O). This enables non-blocking operations on a single thread.",
      },
      {
        question: "What is middleware in Express.js?",
        answer:
          "Middleware are functions that execute during request-response cycle. They can modify req/res objects, end the cycle, or call next(). Used for logging, auth, parsing, error handling.",
      },
      {
        question: "How do you handle errors in Node.js?",
        answer:
          "Use try-catch for sync code, .catch() or try-catch with async/await for promises, error-first callbacks, Express error middleware, and process.on for uncaught exceptions.",
      },
      {
        question: "What is the difference between SQL and NoSQL databases?",
        answer:
          "SQL: structured, relational, ACID compliant, fixed schema (PostgreSQL, MySQL). NoSQL: flexible schema, horizontal scaling, various types (document, key-value, graph). Choose based on data structure and scaling needs.",
      },
    ]),
    jobPostion: "Backend Developer",
    jobDesc: "Node.js, Express, MongoDB, PostgreSQL",
    jobExperience: "3",
    createdBy: "test@example.com",
    createdAt: "12-23-2025",
  },
];

let mockUserAnswers = [];
let nextInterviewId = 3;
let nextAnswerId = 1;

// Mock questions generator based on job details
const generateMockQuestions = (jobPosition, jobDesc, jobExperience) => {
  const questions = [
    {
      question: `Tell me about your experience with ${
        jobDesc.split(",")[0]?.trim() || "this technology"
      }.`,
      answer: `A strong answer would demonstrate practical experience with ${jobDesc
        .split(",")[0]
        ?.trim()}, including specific projects, challenges overcome, and measurable outcomes.`,
    },
    {
      question: `As a ${jobPosition}, how do you approach problem-solving?`,
      answer:
        "A good approach includes: understanding the problem fully, breaking it into smaller parts, researching solutions, implementing incrementally, testing thoroughly, and iterating based on feedback.",
    },
    {
      question: `With ${jobExperience} years of experience, what's the most challenging project you've worked on?`,
      answer:
        "Describe a specific project with context, your role, challenges faced, actions taken, and results achieved. Use the STAR method (Situation, Task, Action, Result).",
    },
    {
      question: `How do you stay updated with the latest trends in ${jobPosition.toLowerCase()}?`,
      answer:
        "Good practices include: following industry blogs, taking online courses, attending conferences/meetups, contributing to open source, building side projects, and networking with peers.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer:
        "Show ambition aligned with the role - mention skill growth, potential leadership, deeper expertise in the field, and contributing to meaningful projects.",
    },
  ];
  return questions;
};

// Generate feedback for an answer
const generateMockFeedback = (question, userAnswer) => {
  const answerLength = userAnswer?.length || 0;
  let rating, feedback;

  if (answerLength < 50) {
    rating = "3/10";
    feedback =
      "Your answer is too brief. Try to elaborate more with specific examples and details. A complete answer should demonstrate your knowledge and experience.";
  } else if (answerLength < 150) {
    rating = "5/10";
    feedback =
      "Decent attempt but could use more depth. Consider adding specific examples, metrics, or outcomes to strengthen your response.";
  } else if (answerLength < 300) {
    rating = "7/10";
    feedback =
      "Good answer with reasonable detail. To improve further, you could add more specific technical details or quantifiable achievements.";
  } else {
    rating = "8/10";
    feedback =
      "Excellent comprehensive answer! You've provided good detail. Minor improvement: ensure you're staying focused on the key points.";
  }

  return { rating, feedback };
};

export const mockDB = {
  // Get all interviews for a user
  getInterviews: (userEmail) => {
    return mockInterviews.filter(
      (i) => i.createdBy === userEmail || i.createdBy === "test@example.com"
    );
  },

  // Get single interview by mockId
  getInterview: (mockId) => {
    return mockInterviews.find((i) => i.mockId === mockId);
  },

  // Create new interview
  createInterview: (data) => {
    const questions = generateMockQuestions(
      data.jobPosition,
      data.jobDesc,
      data.jobExperience
    );
    const newInterview = {
      id: nextInterviewId++,
      mockId: data.mockId,
      jsonMockResp: JSON.stringify(questions),
      jobPostion: data.jobPosition,
      jobDesc: data.jobDesc,
      jobExperience: data.jobExperience,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
    };
    mockInterviews.unshift(newInterview);
    return { mockId: newInterview.mockId };
  },

  // Save user answer with feedback
  saveUserAnswer: (data) => {
    const { rating, feedback } = generateMockFeedback(
      data.question,
      data.userAns
    );
    const newAnswer = {
      id: nextAnswerId++,
      mockIdRef: data.mockIdRef,
      question: data.question,
      correctAns: data.correctAns,
      userAns: data.userAns,
      feedback: feedback,
      rating: rating,
      userEmail: data.userEmail,
      createdAt: data.createdAt,
    };
    mockUserAnswers.push(newAnswer);
    return newAnswer;
  },

  // Get feedback for an interview
  getFeedback: (mockId) => {
    return mockUserAnswers.filter((a) => a.mockIdRef === mockId);
  },

  // Get all answers for a user
  getUserAnswers: (userEmail) => {
    return mockUserAnswers.filter(
      (a) => a.userEmail === userEmail || a.userEmail === "test@example.com"
    );
  },
};

export const mockAI = {
  generateQuestions: generateMockQuestions,
  generateFeedback: generateMockFeedback,
};
