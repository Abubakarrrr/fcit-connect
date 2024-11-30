import React from "react";
import { Button } from "../ui/button";
const CTASection= () => {
  return (
    <div
      className="relative bg-cover bg-center py-[67px] my-8 px-8 flex items-center justify-center bg-[#06B6D4] rounded-2xl"
    >
      {/* Left Top Star Image */}
      <img
        src="/star.svg" 
        alt="Star"
        className="absolute top-0 left-0 sm:w-72 sm:h-52 w-20 h-20 max-lg:opacity-60"
      />
      <img
        src="/star.svg" 
        alt="Star"
        className="absolute top-4 left-44 sm:w-72 sm:h-52 w-20 h-20 opacity-30"
      />

      {/* Right Bottom Star Image */}
      <img
        src="/star.svg" 
        alt="Star"
        className="absolute bottom-0 right-0 sm:w-72 sm:h-52 w-20 h-20 max-lg:opacity-60"
      />
      <img
        src="/star.svg"
        alt="Star"
        className="absolute bottom-4 right-44 sm:w-72 sm:h-52 w-20 h-20 opacity-40"
      />

      {/* CTA Content */}
      <div className="text-center text-white z-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
        Ready to Share and Collaborate?
        </h2>
        <p className="md:text-lg mb-6 md:max-w-4xl ">
        Join our community of innovators and start your journey today!
        </p>
         <Button variant="secondary">
           Get Started
         </Button>
       
      </div>
    </div>
  );
};

export default CTASection;