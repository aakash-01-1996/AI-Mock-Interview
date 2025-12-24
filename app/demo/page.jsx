"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  Plus,
  Play,
  MessageSquare,
  Mic,
  StopCircle,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Link from "next/link";

export default function DemoPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");

  // Interview state
  const [activeInterview, setActiveInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  // Fetch interviews on mount
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("/api/mock/interviews?email=demo@example.com");
      const data = await res.json();
      setInterviews(data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const createInterview = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/mock/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockId: uuidv4(),
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: "demo@example.com",
          createdAt: moment().format("MM-DD-YYYY"),
        }),
      });
      const data = await res.json();
      setOpenDialog(false);
      setJobPosition("");
      setJobDesc("");
      setJobExperience("");
      fetchInterviews();
    } catch (error) {
      console.error("Error creating interview:", error);
    } finally {
      setCreating(false);
    }
  };

  const startInterview = async (mockId) => {
    try {
      const res = await fetch(`/api/mock/interviews/${mockId}`);
      const interview = await res.json();
      setActiveInterview(interview);
      setQuestions(JSON.parse(interview.jsonMockResp));
      setActiveQuestionIndex(0);
      setAnswers([]);
      setShowFeedback(false);
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;

    try {
      const res = await fetch("/api/mock/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockIdRef: activeInterview.mockId,
          question: questions[activeQuestionIndex].question,
          correctAns: questions[activeQuestionIndex].answer,
          userAns: userAnswer,
          userEmail: "demo@example.com",
          createdAt: moment().format("MM-DD-YYYY"),
        }),
      });
      const feedback = await res.json();
      setAnswers([...answers, feedback]);
      setUserAnswer("");

      if (activeQuestionIndex < questions.length - 1) {
        setActiveQuestionIndex(activeQuestionIndex + 1);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const viewFeedback = async (mockId) => {
    try {
      const res = await fetch(`/api/mock/feedback?mockId=${mockId}`);
      const data = await res.json();
      setFeedbackList(data);
      setShowFeedback(true);
      setActiveInterview(interviews.find((i) => i.mockId === mockId));
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const endInterview = () => {
    viewFeedback(activeInterview.mockId);
  };

  const simulateRecording = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate speech-to-text with sample text
      const sampleAnswers = [
        "I have extensive experience with this technology through multiple projects...",
        "My approach involves breaking down problems systematically and collaborating with the team...",
        "In my previous role, I led a challenging project that required innovative solutions...",
        "I stay updated through online courses, tech blogs, and participating in developer communities...",
        "I aim to grow into a senior role while continuously expanding my technical expertise...",
      ];
      setUserAnswer(
        sampleAnswers[activeQuestionIndex] || "This is my recorded answer..."
      );
    }
  };

  // Show feedback view
  if (showFeedback) {
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Interview Feedback
        </h1>
        <p className="text-gray-600 mb-6">
          {activeInterview?.jobPostion} - {activeInterview?.jobDesc}
        </p>

        {feedbackList.length === 0 ? (
          <p className="text-gray-500">
            No answers recorded for this interview yet.
          </p>
        ) : (
          <div className="space-y-4">
            {feedbackList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="flex justify-between p-4 bg-secondary rounded-lg text-left gap-4 w-full">
                  <span className="font-medium">{item.question}</span>
                  <ChevronDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border rounded-b-lg">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-semibold text-sm">
                        Rating: {item.rating}
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="font-semibold text-sm">Your Answer:</p>
                      <p className="text-sm">{item.userAns}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-semibold text-sm">Ideal Answer:</p>
                      <p className="text-sm">{item.correctAns}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-semibold text-sm">Feedback:</p>
                      <p className="text-sm">{item.feedback}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}

        <Button
          className="mt-6"
          onClick={() => {
            setShowFeedback(false);
            setActiveInterview(null);
          }}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Show active interview
  if (activeInterview && questions.length > 0) {
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">
          {activeInterview.jobPostion} Interview
        </h1>
        <p className="text-gray-600 mb-6">
          Question {activeQuestionIndex + 1} of {questions.length}
        </p>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`p-2 text-center rounded-full text-sm cursor-pointer ${
                idx === activeQuestionIndex
                  ? "bg-primary text-white"
                  : idx < answers.length
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100"
              }`}
              onClick={() =>
                idx <= answers.length && setActiveQuestionIndex(idx)
              }
            >
              Q{idx + 1}
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg border mb-6">
          <h2 className="text-lg font-medium mb-4">
            {questions[activeQuestionIndex].question}
          </h2>

          <Textarea
            placeholder="Type your answer here or click Record..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="min-h-[150px] mb-4"
          />

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={simulateRecording}
              className={isRecording ? "bg-red-50" : ""}
            >
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Record Answer
                </>
              )}
            </Button>

            <Button onClick={submitAnswer} disabled={!userAnswer.trim()}>
              Submit Answer
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          {activeQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              Previous
            </Button>
          )}
          {activeQuestionIndex < questions.length - 1 &&
            answers.length > activeQuestionIndex && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              >
                Next Question
              </Button>
            )}
          {answers.length === questions.length && (
            <Button onClick={endInterview}>
              End Interview & View Feedback
            </Button>
          )}
          <Button variant="ghost" onClick={() => setActiveInterview(null)}>
            Exit
          </Button>
        </div>
      </div>
    );
  }

  // Show dashboard
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Demo Dashboard</h1>
          <p className="text-gray-600">
            Test the mock interview system without authentication
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">
          🧪 <strong>Demo Mode:</strong> This uses mock data and doesn't require
          any API keys. Perfect for testing the app flow!
        </p>
      </div>

      {/* Create Interview Button */}
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all mb-8 max-w-xs"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-lg text-center flex items-center justify-center gap-2">
          <Plus className="h-5 w-5" /> Add New Interview
        </h2>
      </div>

      {/* Interview List */}
      <h2 className="text-xl font-semibold mb-4">Your Mock Interviews</h2>

      {loading ? (
        <p>Loading...</p>
      ) : interviews.length === 0 ? (
        <p className="text-gray-500">
          No interviews yet. Create one to get started!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interviews.map((interview) => (
            <div
              key={interview.mockId}
              className="border rounded-lg p-4 bg-white"
            >
              <h3 className="font-bold text-primary">{interview.jobPostion}</h3>
              <p className="text-sm text-gray-600">
                {interview.jobExperience} Years Experience
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Created: {interview.createdAt}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => viewFeedback(interview.mockId)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" /> Feedback
                </Button>
                <Button
                  size="sm"
                  onClick={() => startInterview(interview.mockId)}
                >
                  <Play className="h-4 w-4 mr-1" /> Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Interview Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Mock Interview</DialogTitle>
          </DialogHeader>
          <form onSubmit={createInterview}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Job Position</label>
                <Input
                  placeholder="e.g., Frontend Developer"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Job Description / Tech Stack
                </label>
                <Textarea
                  placeholder="e.g., React, TypeScript, Node.js"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating ? "Creating..." : "Create Interview"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
