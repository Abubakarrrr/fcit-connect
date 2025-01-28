import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the purpose of this e-repository?",
      answer:
        "The e-repository is designed to centralize final year projects (FYPs), allowing students and alumni to upload, manage, and search for projects efficiently.",
    },
    {
      question: "Who can upload projects to the repository?",
      answer:
        "Students and alumni can upload their FYPs to the repository by filling out the submission form and providing the required details.",
    },
    {
      question: "What information is required for project submission?",
      answer:
        "Users need to provide the project title, description, batch, supervisor name, documentation, university card for verification, email, contact details, team members, tech stack, domain, and a README file.",
    },
    {
      question: "Can visitors filter and search for projects?",
      answer:
        "Yes, visitors can filter projects by batch, category, supervisor, or other attributes, and view project details through an intuitive interface.",
    },
    {
      question: "What is the predictive analysis tool, and how does it work?",
      answer:
        "The predictive analysis tool allows users to submit project ideas for AI analysis, providing a report on uniqueness, similarities, and differences with existing projects in the repository using RAG techniques and vector embeddings.",
    },
    {
      question: "Is this e-repository accessible on mobile devices?",
      answer:
        "Yes, the e-repository is fully responsive and can be accessed seamlessly on mobile devices.",
    },
    {
      question: "How is user data secured in the repository?",
      answer:
        "We prioritize user data security with robust measures, ensuring that sensitive information, including project details and personal data, remains safe.",
    },
    {
      question: "How can I contact support for any issues?",
      answer:
        "You can reach out to support via email or through the help section provided in the e-repository platform.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Got <span className="text-blue-500">Questions?</span>
        </h2>
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          We've Got <span className="text-green-500">Answers</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We're here to help you find the answers you need.
        </p>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 group border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-900"
              onClick={() => toggleFAQ(index)}
            >
              <p>{faq.question}</p>
              {openIndex === index ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </div>
            {openIndex === index && (
              <div className="p-4 text-gray-700 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
