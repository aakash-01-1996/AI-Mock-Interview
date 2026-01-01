// Local AI Service - Generates interview questions and feedback without external API
// This is a cost-free alternative that uses pre-defined question templates and intelligent feedback

// Comprehensive question bank organized by technology/skill
const questionBank = {
  // Frontend Technologies
  react: [
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
      question: "How does the virtual DOM work in React?",
      answer:
        "The virtual DOM is a lightweight JavaScript representation of the real DOM. React compares virtual DOM snapshots (diffing) and only updates changed elements in the real DOM (reconciliation), minimizing expensive DOM operations.",
    },
    {
      question: "What is the purpose of useEffect hook?",
      answer:
        "useEffect handles side effects in functional components like data fetching, subscriptions, and DOM manipulation. It runs after render and can return a cleanup function. The dependency array controls when it re-runs.",
    },
  ],
  javascript: [
    {
      question: "Explain the difference between let, const, and var.",
      answer:
        "var is function-scoped, hoisted, and can be redeclared. let is block-scoped, not hoisted, can be reassigned. const is block-scoped, not hoisted, cannot be reassigned (but objects/arrays can be mutated).",
    },
    {
      question: "What is closure in JavaScript?",
      answer:
        "A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has returned. It 'closes over' the variables, maintaining their references.",
    },
    {
      question: "Explain the event loop in JavaScript.",
      answer:
        "The event loop handles async operations. It processes the call stack, then checks the microtask queue (promises), then the macrotask queue (setTimeout, events). This enables non-blocking single-threaded execution.",
    },
    {
      question: "What is the difference between == and ===?",
      answer:
        "== performs type coercion before comparison, so '5' == 5 is true. === is strict equality without type coercion, so '5' === 5 is false. Always prefer === for predictable comparisons.",
    },
    {
      question: "How does prototypal inheritance work in JavaScript?",
      answer:
        "Objects inherit from other objects through the prototype chain. When accessing a property, JavaScript looks up the chain until found or reaches null. ES6 classes are syntactic sugar over prototypes.",
    },
  ],
  typescript: [
    {
      question: "What are the benefits of using TypeScript over JavaScript?",
      answer:
        "TypeScript provides static typing for catching errors at compile time, better IDE support with autocomplete, improved code documentation, interfaces for contracts, and easier refactoring of large codebases.",
    },
    {
      question:
        "Explain the difference between interface and type in TypeScript.",
      answer:
        "Both define object shapes. Interfaces can be extended/merged and are preferred for objects. Types are more flexible, supporting unions, intersections, and primitives. Use interface for objects, type for complex types.",
    },
    {
      question: "What are generics in TypeScript and why use them?",
      answer:
        "Generics allow writing reusable code that works with multiple types while maintaining type safety. They're like type parameters: function identity<T>(arg: T): T returns the same type passed in.",
    },
  ],
  css: [
    {
      question: "Explain the CSS Box Model.",
      answer:
        "The box model consists of content, padding, border, and margin. Content is the actual element, padding is space inside the border, border wraps the padding, margin is space outside. box-sizing: border-box includes padding/border in width.",
    },
    {
      question: "What is the difference between Flexbox and Grid?",
      answer:
        "Flexbox is one-dimensional (row OR column), ideal for component layouts. Grid is two-dimensional (rows AND columns), ideal for page layouts. Use Flexbox for simpler layouts, Grid for complex multi-axis designs.",
    },
    {
      question: "How does CSS specificity work?",
      answer:
        "Specificity determines which styles apply when rules conflict. Order: inline styles > IDs > classes/attributes > elements. !important overrides all. Calculate as (a,b,c,d) where higher positions win.",
    },
  ],
  // Backend Technologies
  nodejs: [
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
  ],
  python: [
    {
      question: "What are Python decorators and how do they work?",
      answer:
        "Decorators are functions that modify other functions. They wrap the original function with @decorator syntax. Common uses: logging, authentication, caching, timing. They take a function and return a modified function.",
    },
    {
      question:
        "Explain the difference between list, tuple, set, and dictionary.",
      answer:
        "Lists are ordered, mutable sequences. Tuples are ordered, immutable. Sets are unordered, unique items. Dictionaries are key-value pairs. Choose based on mutability needs and lookup requirements.",
    },
    {
      question: "What is the GIL in Python?",
      answer:
        "The Global Interpreter Lock (GIL) is a mutex in CPython that allows only one thread to execute at a time. It simplifies memory management but limits multi-threading. Use multiprocessing for CPU-bound tasks.",
    },
  ],
  java: [
    {
      question:
        "Explain the difference between abstract class and interface in Java.",
      answer:
        "Abstract classes can have implementations and state, single inheritance only. Interfaces define contracts with multiple inheritance, default methods (Java 8+). Use abstract for IS-A with shared code, interface for CAN-DO.",
    },
    {
      question: "What is the Java Memory Model?",
      answer:
        "JVM memory has heap (objects), stack (method calls, local vars), method area (class data), and native method stack. Garbage collection manages heap memory. Understanding helps prevent memory leaks.",
    },
    {
      question: "How does garbage collection work in Java?",
      answer:
        "GC automatically reclaims unused object memory. It uses generations (young, old, permanent). Objects start in Eden, survive to Survivor, then Old Gen. Different algorithms: Serial, Parallel, G1, ZGC.",
    },
  ],
  // Database
  sql: [
    {
      question: "What is the difference between SQL and NoSQL databases?",
      answer:
        "SQL: structured, relational, ACID compliant, fixed schema (PostgreSQL, MySQL). NoSQL: flexible schema, horizontal scaling, various types (document, key-value, graph). Choose based on data structure and scaling needs.",
    },
    {
      question: "Explain ACID properties in databases.",
      answer:
        "Atomicity: transactions are all-or-nothing. Consistency: data remains valid. Isolation: concurrent transactions don't interfere. Durability: committed data persists. These ensure reliable database operations.",
    },
    {
      question: "What are indexes and how do they improve performance?",
      answer:
        "Indexes are data structures that speed up data retrieval like a book index. They trade write speed and storage for faster reads. Use on frequently queried columns, but avoid over-indexing.",
    },
  ],
  mongodb: [
    {
      question: "When would you choose MongoDB over a relational database?",
      answer:
        "Choose MongoDB for: flexible schema needs, document-like data, horizontal scaling, rapid development, JSON-heavy apps. Choose SQL for: complex relationships, ACID requirements, structured data, complex queries.",
    },
    {
      question: "Explain the aggregation pipeline in MongoDB.",
      answer:
        "Aggregation pipeline processes documents through stages: $match (filter), $group (aggregate), $project (reshape), $sort, $limit. Each stage transforms the data. Efficient for complex data analysis.",
    },
  ],
  // DevOps & Cloud
  docker: [
    {
      question: "What is Docker and why is it useful?",
      answer:
        "Docker containerizes applications with their dependencies for consistent environments. Benefits: portability, isolation, resource efficiency, fast deployment, microservices support. Images are blueprints, containers are running instances.",
    },
    {
      question: "Explain the difference between Docker images and containers.",
      answer:
        "Images are read-only templates containing application code and dependencies. Containers are running instances of images with a writable layer. Multiple containers can run from one image.",
    },
  ],
  aws: [
    {
      question: "Explain the shared responsibility model in AWS.",
      answer:
        "AWS manages security OF the cloud (infrastructure, hardware, networking). Customers manage security IN the cloud (data, access, encryption, configurations). Understanding this division is crucial for compliance.",
    },
    {
      question: "What is the difference between EC2 and Lambda?",
      answer:
        "EC2 provides virtual servers you manage (OS, scaling, patches). Lambda is serverless, runs code on events, auto-scales, pay per execution. Use EC2 for long-running apps, Lambda for event-driven, short tasks.",
    },
  ],
  // General
  softskills: [
    {
      question: "How do you handle disagreements with team members?",
      answer:
        "Listen actively, understand their perspective, focus on facts not emotions, find common ground, propose solutions, escalate respectfully if needed. Key is maintaining professionalism and team relationships.",
    },
    {
      question: "Describe a challenging project and how you handled it.",
      answer:
        "Use STAR method: describe the Situation, your Task/role, Actions you took (technical and soft skills), and Results achieved. Include metrics where possible and lessons learned.",
    },
    {
      question: "How do you stay updated with technology trends?",
      answer:
        "Read tech blogs and documentation, follow industry leaders, take online courses, attend conferences/meetups, contribute to open source, build side projects, participate in communities like Stack Overflow.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer:
        "Show ambition aligned with the role - mention skill growth, potential leadership opportunities, deeper expertise in the field, and contributing to meaningful projects. Show commitment to continuous learning.",
    },
  ],
};

// Helper to find relevant questions based on job description
function findRelevantQuestions(jobDesc, jobPosition) {
  const desc = (jobDesc + " " + jobPosition).toLowerCase();
  const relevantQuestions = [];

  // Map keywords to categories
  const categoryKeywords = {
    react: [
      "react",
      "reactjs",
      "react.js",
      "frontend",
      "front-end",
      "nextjs",
      "next.js",
    ],
    javascript: [
      "javascript",
      "js",
      "es6",
      "nodejs",
      "frontend",
      "fullstack",
      "full-stack",
    ],
    typescript: ["typescript", "ts", "angular", "frontend"],
    css: ["css", "scss", "sass", "tailwind", "frontend", "ui", "ux"],
    nodejs: [
      "node",
      "nodejs",
      "express",
      "backend",
      "back-end",
      "fullstack",
      "server",
    ],
    python: [
      "python",
      "django",
      "flask",
      "fastapi",
      "data",
      "machine learning",
      "ml",
    ],
    java: ["java", "spring", "backend", "enterprise"],
    sql: ["sql", "mysql", "postgresql", "postgres", "database", "backend"],
    mongodb: ["mongodb", "mongo", "nosql", "database"],
    docker: ["docker", "kubernetes", "k8s", "devops", "container"],
    aws: ["aws", "cloud", "azure", "gcp", "devops"],
    softskills: ["manager", "lead", "senior", "principal"], // Always include some soft skills
  };

  // Find matching categories
  const matchedCategories = new Set();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (desc.includes(keyword)) {
        matchedCategories.add(category);
      }
    }
  }

  // Always add soft skills
  matchedCategories.add("softskills");

  // If no specific tech matched, add general ones based on position
  if (matchedCategories.size <= 1) {
    if (desc.includes("frontend") || desc.includes("front")) {
      matchedCategories.add("react");
      matchedCategories.add("javascript");
      matchedCategories.add("css");
    } else if (desc.includes("backend") || desc.includes("back")) {
      matchedCategories.add("nodejs");
      matchedCategories.add("sql");
    } else {
      // Default to full-stack basics
      matchedCategories.add("javascript");
      matchedCategories.add("nodejs");
    }
  }

  // Collect questions from matched categories
  for (const category of matchedCategories) {
    if (questionBank[category]) {
      relevantQuestions.push(...questionBank[category]);
    }
  }

  return relevantQuestions;
}

// Generate questions for an interview
export function generateInterviewQuestions(
  jobPosition,
  jobDesc,
  jobExperience
) {
  const questionCount =
    parseInt(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 5;
  const relevantQuestions = findRelevantQuestions(jobDesc, jobPosition);

  // Shuffle and pick questions
  const shuffled = relevantQuestions.sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffled.slice(
    0,
    Math.min(questionCount, shuffled.length)
  );

  // Add experience-based customization to first question
  if (selectedQuestions.length > 0) {
    const years = parseInt(jobExperience) || 0;
    if (years > 5) {
      selectedQuestions.unshift({
        question: `As a senior ${jobPosition} with ${jobExperience} years of experience, how do you approach mentoring junior developers?`,
        answer:
          "Senior developers should lead by example, provide constructive code reviews, create learning opportunities, share knowledge through documentation and presentations, and create a safe environment for questions and mistakes.",
      });
    } else if (years > 2) {
      selectedQuestions.unshift({
        question: `With ${jobExperience} years as a ${jobPosition}, what's the most impactful project you've worked on?`,
        answer:
          "Describe a specific project using STAR method: the Situation/context, your Task/role, Actions you took (technical decisions, collaboration), and measurable Results achieved.",
      });
    }
  }

  // Ensure we have exactly questionCount questions
  return selectedQuestions.slice(0, questionCount);
}

// Generate feedback for a user's answer
export function generateFeedback(question, userAnswer, correctAnswer) {
  const answerLength = (userAnswer || "").trim().length;
  const wordCount = (userAnswer || "")
    .trim()
    .split(/\s+/)
    .filter((w) => w).length;

  let rating, feedback;

  if (answerLength === 0) {
    rating = "0/10";
    feedback =
      "No answer was provided. Make sure to articulate your thoughts clearly. Even a partial answer is better than no answer.";
  } else if (wordCount < 10) {
    rating = "2/10";
    feedback =
      "Your answer is too brief. Interview answers should typically be 1-2 minutes spoken, which translates to at least 50-100 words. Try to provide context, examples, and demonstrate your understanding.";
  } else if (wordCount < 30) {
    rating = "4/10";
    feedback =
      "Your answer covers the basics but lacks depth. Consider adding specific examples from your experience, technical details, or explaining your thought process. Use the STAR method (Situation, Task, Action, Result) for behavioral questions.";
  } else if (wordCount < 60) {
    rating = "6/10";
    feedback =
      "Good attempt with reasonable content. To improve: add more specific technical details or real-world examples, mention tools/technologies you've used, and quantify results where possible (e.g., 'improved performance by 40%').";
  } else if (wordCount < 100) {
    rating = "7/10";
    feedback =
      "Solid answer with good detail. Minor suggestions: ensure your answer directly addresses all parts of the question, structure your response clearly, and conclude with a summary or key takeaway.";
  } else {
    rating = "8/10";
    feedback =
      "Excellent comprehensive answer! You've provided substantial detail. Just ensure you're staying focused and concise - in real interviews, aim for 1-2 minutes per answer. Practice delivering this content smoothly.";
  }

  // Add question-specific feedback hints
  const questionLower = question.toLowerCase();
  if (
    questionLower.includes("experience") &&
    !userAnswer.toLowerCase().includes("year") &&
    !userAnswer.toLowerCase().includes("project")
  ) {
    feedback +=
      " Consider mentioning specific projects or timeframes to make your experience more tangible.";
  }
  if (
    questionLower.includes("challenge") &&
    !userAnswer.toLowerCase().includes("learn") &&
    !userAnswer.toLowerCase().includes("result")
  ) {
    feedback +=
      " Don't forget to mention what you learned or the outcome of handling the challenge.";
  }

  return { rating, feedback };
}

// Export for use in components
export const localAI = {
  generateQuestions: generateInterviewQuestions,
  generateFeedback: generateFeedback,
  isAvailable: true,
};

export default localAI;
