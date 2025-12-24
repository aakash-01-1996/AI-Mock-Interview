import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function Upgrade() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "3 mock interviews per month",
        "Basic AI feedback",
        "Text-to-speech questions",
        "Interview history",
      ],
      current: true,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited mock interviews",
        "Advanced AI feedback",
        "Priority support",
        "Detailed analytics",
        "Export interview reports",
        "Custom question sets",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Team management",
        "API access",
        "Custom branding",
        "Dedicated support",
        "Bulk user management",
      ],
    },
  ];

  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl">Upgrade Your Plan</h2>
        <p className="text-gray-500 mt-2">
          Choose the perfect plan to accelerate your interview preparation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative border rounded-xl p-6 ${
              plan.popular
                ? "border-primary shadow-lg scale-105"
                : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="font-bold text-xl">{plan.name}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-1">/{plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-6"
              variant={plan.current ? "outline" : "default"}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        * This is a demo page. Payment integration coming soon.
      </p>
    </div>
  );
}

export default Upgrade;
