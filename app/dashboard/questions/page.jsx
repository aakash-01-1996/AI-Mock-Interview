"use client";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

function Questions() {
  const { user } = useUser();
  const [allAnswers, setAllAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllAnswers = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(UserAnswer.id));
      setAllAnswers(result);
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    fetchAllAnswers();
  }, [fetchAllAnswers]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Question History</h2>
      <p className="text-gray-500 mb-6">
        Review all the questions you've answered across your mock interviews
      </p>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : allAnswers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No questions answered yet.</p>
          <p className="text-sm mt-2">
            Start a mock interview to see your question history here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allAnswers.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="flex justify-between p-4 bg-secondary rounded-lg text-left gap-4 w-full hover:bg-secondary/80 transition-colors">
                <div className="flex-1">
                  <p className="font-medium">{item.question}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Rating: {item.rating || "N/A"} • {item.createdAt}
                  </p>
                </div>
                <ChevronDown className="h-5 w-5 flex-shrink-0" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <div className="flex flex-col gap-3 mt-3">
                  <div className="p-3 border rounded-lg bg-blue-50">
                    <strong className="text-sm">Your Answer:</strong>
                    <p className="text-sm mt-1">
                      {item.userAns || "No answer recorded"}
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg bg-green-50">
                    <strong className="text-sm">Correct Answer:</strong>
                    <p className="text-sm mt-1">{item.correctAns || "N/A"}</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-yellow-50">
                    <strong className="text-sm">Feedback:</strong>
                    <p className="text-sm mt-1">
                      {item.feedback || "No feedback available"}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}

export default Questions;
