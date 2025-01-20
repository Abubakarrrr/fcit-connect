import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">About Us</h1>
        <p className="text-gray-600 mb-4">
          Welcome to our e-repository platform, your one-stop solution for managing final year projects (FYPs). Our mission is to create a centralized system that streamlines the submission, management, and discovery of academic projects, fostering innovation and collaboration among students and alumni.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Our goal is to provide a seamless platform where students and alumni can showcase their hard work, and academic institutions can maintain a well-organized repository of projects for future reference. By integrating cutting-edge technology like AI-powered similarity searches, we aim to enhance the learning and innovation process.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>A streamlined process for project submission and approval.</li>
            <li>Advanced filtering and search capabilities for visitors.</li>
            <li>An AI-powered predictive analysis tool to evaluate project ideas.</li>
            <li>Secure storage and management of project data.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Team</h2>
          <p className="text-gray-600">
            We are a group of passionate developers, designers, and educators committed to bridging the gap between students and technology. Our diverse backgrounds and shared vision drive us to continually improve and expand this platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Dedicated to academic excellence and innovation.</li>
            <li>Secure and user-friendly interface for all stakeholders.</li>
            <li>Proven track record in delivering impactful solutions.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Get in Touch</h2>
          <p className="text-gray-600">
            We’d love to hear from you! Whether you have questions, feedback, or collaboration ideas, feel free to reach out to us.
          </p>
          <p className="text-gray-600 font-medium">Email: contact@fyp-repository.com</p>
        </section>

        <p className="text-center text-gray-500 mt-6">&copy; {new Date().getFullYear()} FCIT Connect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;