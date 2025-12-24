import { Brain, Mic, Video, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HowItWorks() {
  const steps = [
    {
      icon: Brain,
      title: "1. Enter Job Details",
      description:
        "Provide information about the job position you're interviewing for, including the role, job description, and your years of experience. Our AI uses this to generate relevant questions.",
    },
    {
      icon: Video,
      title: "2. Enable Camera & Microphone",
      description:
        "Allow access to your webcam and microphone to simulate a real interview environment. Don't worry - we never record or store your video footage.",
    },
    {
      icon: Mic,
      title: "3. Answer Questions",
      description:
        "Listen to AI-generated interview questions and record your verbal responses. Our speech-to-text technology captures your answers accurately.",
    },
    {
      icon: CheckCircle,
      title: "4. Get Instant Feedback",
      description:
        "Receive detailed AI-powered feedback on each answer, including ratings and suggestions for improvement. Compare your responses with ideal answers.",
    },
  ];

  const faqs = [
    {
      question: "Is my video recorded?",
      answer:
        "No, we never record your video. The webcam is only used to simulate a real interview environment and help you practice maintaining eye contact.",
    },
    {
      question: "How accurate is the speech-to-text?",
      answer:
        "We use advanced speech recognition technology that works well in most environments. For best results, use a quiet space and speak clearly.",
    },
    {
      question: "Can I practice for any job role?",
      answer:
        "Yes! Our AI can generate relevant interview questions for any job role across various industries and experience levels.",
    },
    {
      question: "How is my answer rated?",
      answer:
        "Our AI analyzes your answer based on relevance, completeness, clarity, and how well it addresses the question. You'll receive a rating and specific feedback.",
    },
  ];

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-bold text-3xl">How It Works</h1>
        <p className="text-gray-500 mt-2">
          Master your interview skills in 4 simple steps
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8 mb-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-6 items-start p-6 bg-white rounded-xl border hover:shadow-md transition-shadow"
          >
            <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
              <step.icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-primary/5 rounded-xl p-8 mb-16">
        <h2 className="font-bold text-2xl mb-4">Ready to Start Practicing?</h2>
        <p className="text-gray-600 mb-6">
          Create your first mock interview and boost your confidence today.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            Go to Dashboard <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* FAQs */}
      <div>
        <h2 className="font-bold text-2xl mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-5">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
