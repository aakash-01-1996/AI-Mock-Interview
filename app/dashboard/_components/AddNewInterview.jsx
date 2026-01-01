"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { generateInterviewQuestions } from "@/utils/localAI";
import { mockDB } from "@/utils/mockData";
import { Loader, LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    let MockJsonResp;
    const mockId = uuidv4();

    // Check if Gemini API is available, otherwise use local AI
    if (chatSession) {
      try {
        const InputPrompt =
          "Job Position: " +
          jobPosition +
          ", Job Description: " +
          jobDesc +
          ", Years of Experience: " +
          jobExperience +
          ". On given information please provide " +
          process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
          " interview questions with answers in JSON format. Give questions and answers as fields in JSON";

        const result = await chatSession.sendMessage(InputPrompt);
        MockJsonResp = result.response
          .text()
          .replace("```json", " ")
          .replace("```", " ");
        console.log(JSON.parse(MockJsonResp));
      } catch (error) {
        console.log("Gemini API error, falling back to local AI:", error);
        // Fall back to local AI
        const questions = generateInterviewQuestions(
          jobPosition,
          jobDesc,
          jobExperience
        );
        MockJsonResp = JSON.stringify(questions);
      }
    } else {
      // Use local AI when Gemini is not configured
      console.log("Using local AI for question generation");
      const questions = generateInterviewQuestions(
        jobPosition,
        jobDesc,
        jobExperience
      );
      MockJsonResp = JSON.stringify(questions);
    }

    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      // Check if database is available, otherwise use mock storage
      if (db) {
        try {
          const resp = await db
            .insert(MockInterview)
            .values({
              mockId: mockId,
              jsonMockResp: MockJsonResp,
              jobPostion: jobPosition,
              jobDesc: jobDesc,
              jobExperience: jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("MM-DD-YYYY"),
            })
            .returning({ mockId: MockInterview.mockId });

          console.log("Inserted ID: ", resp);
          if (resp) {
            setOpenDialog(false);
            router.push("/dashboard/interview/" + mockId);
          }
        } catch (error) {
          console.log("Database error, using demo mode:", error);
          // Fall back to mock storage
          useDemoMode();
        }
      } else {
        // Use demo mode (in-memory storage)
        useDemoMode();
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);

    function useDemoMode() {
      mockDB.createInterview({
        mockId: mockId,
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy:
          user?.primaryEmailAddress?.emailAddress || "demo@example.com",
        createdAt: moment().format("MM-DD-YYYY"),
      });
      console.log("Using demo mode - data stored in memory");
      setOpenDialog(false);
      router.push("/dashboard/interview/" + mockId);
    }
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the Job you are Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="font-semibold text-2xl"></h2>
                  <h2>Add Details about your Job role/Position</h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Position</label>
                    <Input
                      placeholder="Ex. Software Engineer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className=" my-3">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJS, MySQL"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>

                  <div className=" my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5."
                      type="number"
                      max="30"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
