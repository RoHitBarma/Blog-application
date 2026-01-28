import React from "react";
import Hero from "../components/Landing/Hero";
import HowItWork from "../components/Landing/HowItWork";
import Features from "../components/Landing/Features";
import Testimonials from "../components/Landing/Testimonials";

const Home = () => {
    return (
        // <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        //     {/* Navbar */}
        //     <nav className="p-6 flex justify-between items-center">
        //         <h1 className="text-2xl font-bold text-white">BlogApp</h1>
        //         <div className="space-x-4">
        //             <Link to="/login" className="text-white hover:text-gray-200">
        //                 Login
        //             </Link>
        //             <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100">
        //                 Get Started
        //             </Link>
        //         </div>
        //     </nav>

        //     {/* Hero Section */}
        //     <div className="flex flex-col items-center justify-center text-center text-white py-20">
        //         <h1 className="text-5xl font-bold mb-6">Write. Share. Inspire.</h1>
        //         <p className="text-xl mb-10 max-w-2xl">
        //             Join thousands of writers sharing their stories, ideas, and knowledge.
        //         </p>
        //         <Link to="/register" className="bg-white text-blue-600 text-lg px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition">
        //             Start Writing Now
        //         </Link>
        //     </div>
        // </div>
        <>
            <Hero />
            <Features />
            <HowItWork />
            <Testimonials />
        </>
    );
};

export default Home