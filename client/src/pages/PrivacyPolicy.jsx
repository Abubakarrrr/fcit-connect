import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          Welcome to our e-repository platform for centralized final year project (FYP) management. Your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, and protect your information.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Personal Information:</strong> Name, email address, contact number, and university card details for verification purposes.
            </li>
            <li>
              <strong>Project Details:</strong> Project title, description, batch, supervisor name, documentation, tech stack, domain, and team members.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our platform, including filters, search queries, and predictive analysis tool usage.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>To facilitate project submission and management.</li>
            <li>To provide personalized feedback and project approval/rejection notifications.</li>
            <li>To enhance the predictive analysis tool by comparing project ideas with existing data.</li>
            <li>To improve the user experience and platform features based on usage data.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Data Sharing and Security</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>We do not share your personal information with third parties except as required by law.</li>
            <li>Your data is securely stored in encrypted databases (MongoDB and Pinecone).</li>
            <li>We implement industry-standard security measures to protect your information from unauthorized access or disclosure.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">4. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Access and update your personal information at any time through your profile settings.</li>
            <li>Request deletion of your data by contacting our support team.</li>
            <li>Opt-out of the predictive analysis tool if you do not wish to participate in similarity searches.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">5. Changes to this Privacy Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Any changes will be communicated through our platform or via email. Please review this policy periodically to stay informed.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600 font-medium">Email: contact@fyp-repository.com</p>
        </section>

        <p className="text-center text-gray-500 mt-6">&copy; {new Date().getFullYear()} FCIT Connect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
