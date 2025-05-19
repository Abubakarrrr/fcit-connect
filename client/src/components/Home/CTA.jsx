import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl my-12 px-6 py-16 overflow-hidden shadow-xl">
      {/* Decorative Stars */}
      <img
        src="/star.svg"
        alt="Star"
        className="absolute top-4 left-4 w-12 h-12 opacity-30 animate-pulse"
      />
      <img
        src="/star.svg"
        alt="Star"
        className="absolute bottom-4 right-4 w-16 h-16 opacity-40 animate-spin-slow"
      />

      {/* CTA Content */}
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ready to Share and Collaborate?
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Be a part of FCIT Connect. Join a growing community of innovators and contribute to a smarter academic ecosystem.
        </p>
        <Link to="/signup">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 text-base font-medium transition-all duration-300 rounded-xl">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
