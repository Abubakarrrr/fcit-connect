"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's are the similarities ?",
    "What are the differences?",
    "Give me uniqueness score?",
    "How can i improve my proposal?",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    (<div className="h-[20rem] flex flex-col justify-center  items-center px-4">
      <h2
        className="mb-10  text-xl text-center sm:text-5xl dark:text-white text-black">
        Analyze your Proposals
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>)
  );
}
