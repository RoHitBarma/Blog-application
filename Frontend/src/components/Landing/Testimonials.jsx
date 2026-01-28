// src/components/landing/Testimonials.jsx
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Testimonials({
  autoplay = true,
  autoplayInterval = 5000, // 5s
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Add more testimonials as you like
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      text: "This platform completely transformed how I share my experiences!",
      initials: "SJ",
    },
    {
      name: "Amit Patel",
      role: "Tech Writer",
      text: "Clean editor, great community — my traffic doubled in one month.",
      initials: "AP",
    },
    {
      name: "Lina Gomez",
      role: "Food Critic",
      text: "Easy to customize and publish. Readers loved the new layout!",
      initials: "LG",
    },
  ];

  // autoplay
  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, testimonials.length]);

  // defensive: ensure index valid if testimonials change
  useEffect(() => {
    if (activeIndex >= testimonials.length) setActiveIndex(0);
  }, [testimonials.length, activeIndex]);

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">What Writers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Real feedback from creators who publish on Expressly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <article className="bg-gray-50 rounded-2xl shadow-lg p-8 transition-transform duration-300 transform hover:-translate-y-1">
            {/* Avatar + name */}
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {current.initials}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{current.name}</h3>
              <p className="text-sm text-gray-500">{current.role}</p>

              {/* Stars */}
              <div className="flex justify-center mt-2 text-yellow-400" aria-hidden>
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} className="mx-0.5" />
                ))}
              </div>
            </div>

            {/* Quote */}
            <p className="text-center text-gray-700 italic text-lg">“{current.text}”</p>

            {/* Dots / controls */}
            <div className="flex justify-center mt-6 gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === activeIndex ? "bg-indigo-600 scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next (optional) */}
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() =>
                  setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                }
                className="text-sm px-3 py-1 rounded-full border hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                Prev
              </button>
              <button
                onClick={() => setActiveIndex((i) => (i + 1) % testimonials.length)}
                className="text-sm px-3 py-1 rounded-full border hover:bg-gray-100"
                aria-label="Next testimonial"
              >
                Next
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
