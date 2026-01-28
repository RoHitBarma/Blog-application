// src/components/layout/Navbar.jsx
import React, { useEffect, useState } from "react";
import { FaPenFancy, FaUserPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close mobile menu on navigation
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);


  return (
    <nav
      className={`w-full z-50 transition-all duration-300 py-3 ${isScrolled || open ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5"
        }relative md:fixed md:top-0 md:left-0 md:right-0`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <FaPenFancy className="text-3xl text-indigo-600" />
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Expressly
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-indigo-600">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600">
            How It Works
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-indigo-600">
            Testimonials
          </a>
        </div>

        {/* Actions / Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors flex items-center gap-2"
            aria-label="Login"
          >
            <FaSignInAlt />
            <span className="hidden sm:inline">Login</span>
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
            aria-label="Register"
          >
            <FaUserPlus />
            <span>Sign Up Free</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden transition-max-height duration-300 overflow-hidden ${open ? "max-h-[calc(100vh - 64px)]" : "max-h-0"
          }`}
      >
        <div className="w-full bg-white border-t border-gray-100 shadow-lg px-4 pb-4 flex flex-col gap-3">
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="block text-gray-700 py-2 hover:text-indigo-600"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setOpen(false)}
            className="block text-gray-700 py-2 hover:text-indigo-600"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            onClick={() => setOpen(false)}
            className="block text-gray-700 py-2 hover:text-indigo-600"
          >
            Testimonials
          </a>

          <div className="pt-2 border-t mt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className="w-full text-left px-3 py-2 text-indigo-600 font-medium flex items-center gap-2"
            >
              <FaSignInAlt />
              Login
            </button>

            <button
              onClick={() => {
                setOpen(false);
                navigate("/register");
              }}
              className="w-full text-left px-3 py-2 bg-indigo-600 text-white rounded flex items-center gap-2 justify-center"
            >
              <FaUserPlus />
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
