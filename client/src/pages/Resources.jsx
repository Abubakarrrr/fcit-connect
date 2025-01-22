import React from "react";

const Resources = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen flex items-center justify-center">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-extrabold text-[#06B6D4] mb-4">
          Resources Coming Soon...
        </h1>
        <p className="text-gray-700 text-lg">
          We're crafting a collection of valuable resources just for you! Stay tuned for guides, tools, and more to help you achieve your goals.
        </p>
        <div className="mt-6">
          <button
            className="px-6 py-3 bg-[#06B6D4] text-white rounded-lg shadow transition-all focus:ring-2  focus:outline-none"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
