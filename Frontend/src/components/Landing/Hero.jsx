// Hero.jsx (adjusted spacing & container)
import React from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/blog-banner-image.svg"

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="pt-8 md:pt-[84px] pb-20"> 
      {/* pt equals approx navbar height (84px). Adjust if your navbar height is different */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Share Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Ideas with the World
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Expressly is your platform to share thoughts, experiences, and creative writing.
              Join thousands of writers already expressing their creativity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <FaUserPlus />
                <span>Create Free Account</span>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaSignInAlt />
                <span>Login to Dashboard</span>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:w-1/2">
            <div className="space-y-4">
              <img src={HeroImg} alt="blog-banner" className="h-80 md:h-96 shadow-xl rounded-2xl w-full border-gray-100"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
