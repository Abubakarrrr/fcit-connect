import Layout from "@/components/shared/Layout";
import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Contact = () => {
  return (
    <div>
      <Layout>
        <ContactSection />
      </Layout>
    </div>
  );
};

export default Contact;

const contactItems = [
  {
    icon: <FiMail className="text-primary text-2xl" />,
    title: "Email",
    description: "Our friendly team is here to help.",
    detail: "abubakkeramjad10@gmail.com",
  },
  {
    icon: <FiMapPin className="text-primary text-2xl" />,
    title: "Office",
    description: "Come say hello at our office FCIT",
    detail: (
      <div>
        <p>FCIT,Lahore</p>
        <p>New Campus</p>
      </div>
    ),
  },
  {
    icon: <FiPhone className="text-primary text-2xl" />,
    title: "Phone",
    description: "Mon-Fri from 8am to 5pm.",
    detail: "+1 (555) 000-0000",
  },
];

const ContactSection = () => {
  return (
    <section className="py-12 sm:px-12">
      {/* Header Section */}
      <div className=" mb-12">
        <p className="text-sm text-primary font-semibold mb-1">Contact us</p>
        <h2 className="text-3xl font-semibold text-primary mb-2">
          Get in touch
        </h2>
        <p className="text-gray-500">
          Our friendly team is always here to chat.
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {contactItems.map((item, index) => (
          <div key={index} className="flex flex-col  space-y-4">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              {item.icon}
            </div>
            {/* Title and Description */}
            <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
            {/* Detail */}
            <div className="text-gray-800 font-medium">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};




