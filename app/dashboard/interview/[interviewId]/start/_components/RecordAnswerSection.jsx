"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { generateFeedback as generateLocalFeedback } from "@/utils/localAI";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    let JsonFeedbackResp;
    const currentQuestion = mockInterviewQuestion[activeQuestionIndex];

    // Check if Gemini API is available, otherwise use local AI
    if (chatSession) {
      try {
        const feedbackPrompt =
          "Question: " +
          currentQuestion?.question +
          ", User Answer: " +
          userAnswer +
          ". Based on the question and user answer for the interview question, " +
          "please give us rating for answer and feedback as area of improvement if any " +
          "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        console.log(mockJsonResp);
        JsonFeedbackResp = JSON.parse(mockJsonResp);
      } catch (error) {
        console.log("Gemini API error, falling back to local AI:", error);
        // Fall back to local AI
        JsonFeedbackResp = generateLocalFeedback(
          currentQuestion?.question,
          userAnswer,
          currentQuestion?.answer
        );
      }
    } else {
      // Use local AI when Gemini is not configured
      console.log("Using local AI for feedback generation");
      JsonFeedbackResp = generateLocalFeedback(
        currentQuestion?.question,
        userAnswer,
        currentQuestion?.answer
      );
    }

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: currentQuestion?.question,
      correctAns: currentQuestion?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-secondary rounded-lg p-5">
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
