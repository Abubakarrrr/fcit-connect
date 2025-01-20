import Layout from "@/components/shared/Layout";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
const Contact = () => {
  return (
    <div>
      <Layout>
        <ShareYourFeedback/>
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



function ShareYourFeedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      setError("Please provide a rating and a comment.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Handle submission logic (e.g., send feedback to server)
    console.log("Feedback Submitted:", { rating, comment });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6 my-14">
        <h2 className="text-xl font-semibold">Thank you for your feedback! 😊</h2>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Share More Feedback
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto rounded-lg border p-6 shadow-sm my-14">
      <h2 className="text-lg font-semibold">Share Your Feedback</h2>
      <p className="text-sm text-muted-foreground">
        Your feedback helps us improve our services.
      </p>
      <div className="mt-4 space-y-4">
        <div>
          <Label>Rate your experience:</Label>
          <div className="mt-2 flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={cn(
                  "text-xl transition-transform duration-200",
                  star <= rating ? "text-yellow-500" : "text-muted-foreground",
                  "hover:scale-110"
                )}
              >
                <Star />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="feedback-comment">Your Comments:</Label>
          <Textarea
            id="feedback-comment"
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleSubmit} className="w-full">
          Submit Feedback
        </Button>
      </div>
    </div>
  );
}





