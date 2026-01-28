// src/components/layout/Footer.jsx
import React from "react";
import {
  FaPenFancy,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
// If you prefer internal navigation with react-router, uncomment below:
// import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaPenFancy className="text-2xl text-indigo-400" />
              <span className="text-xl font-bold text-white">Expressly</span>
            </div>
            <p className="mb-6 text-sm text-gray-300">
              The platform for writers to share ideas with the world. Write,
              publish and grow your audience.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Expressly on Facebook"
                className="hover:text-white"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Expressly on Twitter"
                className="hover:text-white"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Expressly on Instagram"
                className="hover:text-white"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Expressly on LinkedIn"
                className="hover:text-white"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              {/* If internal routes, use <Link to="/features">Features</Link> */}
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-white">
                  Use Cases
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/blog" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {year} Expressly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
