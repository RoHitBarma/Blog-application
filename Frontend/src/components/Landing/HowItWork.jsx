// src/components/landing/HowItWork.jsx
import React from "react";

export default function HowItWork() {
  const steps = [
    {
      number: "1",
      title: "Sign Up & Create",
      description: "Create your free account and set up your profile.",
    },
    {
      number: "2",
      title: "Write & Format",
      description: "Use our powerful editor to craft beautiful stories.",
    },
    {
      number: "3",
      title: "Publish & Share",
      description: "Share your blog with readers all over the world.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Start Sharing in 3 Simple Steps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Begin your writing journey in minutes — easy, intuitive, and powerful.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="text-center transform transition-all duration-300 hover:-translate-y-2"
            >
              {/* Step number icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-md">
                {step.number}
              </div>

              {/* Step content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
