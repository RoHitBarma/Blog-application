// src/components/landing/Features.jsx
import React from "react";
import { FaEdit, FaPalette } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaEdit className="text-2xl" aria-hidden="true" />,
      title: "Easy Writing",
      description: "Our rich text editor helps you create beautiful blog posts.",
    },
    {
      icon: <FaPalette className="text-2xl" aria-hidden="true" />,
      title: "Customization",
      description: "Design your blog according to your own style and brand.",
    },
    // add more features here if you want
    // { icon: <FaSomeIcon />, title: "Another", description: "..." }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Everything You Need to Express Yourself
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tools, themes and community features that help you write better and
            reach readers worldwide.
          </p>
        </div>

        {/* Features grid */}
        <div
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <article
              role="listitem"
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 max-w-sm mx-auto"
            >
              <div
                className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
