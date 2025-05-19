import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'
import axios from "axios"
const API_URL = `${import.meta.env.VITE_SERVER_URL}`;


export default function Footer() {
  // Newsletter state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Newsletter submit handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/api/newsletter/subscribe`, { email });
      if (res.data.success) {
        setMessage("Subscribed to newsletter successfully!");
        setEmail("");
      } else {
        setMessage(res.data.message || "Subscription failed. Try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black border-t border-gray-800">
      <div className="py-16 md:py-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand and Social Links */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Link to="/" className="inline-block group">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  FCIT Connect
                </h2>
              </Link>
              <p className="text-gray-400 text-lg">
                A collection of 100+ FYPs of our Academic community.
              </p>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" }
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  to="#"
                  className="rounded-full p-2.5 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Product
              </h3>
              <nav className="flex flex-col space-y-3">
                {[
                  { to: "/", text: "Home" },
                  { to: "/fyps", text: "FYPs" },
                  { to: "/analysis", text: "Analysis" },
                  { to: "/resources", text: "Resources" }
                ].map(({ to, text }) => (
                  <Link
                    key={text}
                    to={to}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {text}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Company
              </h3>
              <nav className="flex flex-col space-y-3">
                {[
                  { to: "/about", text: "About" },
                  { to: "/blogs", text: "Blogs" },
                  { to: "/privacy-policy", text: "Privacy Policy" },
                  { to: "/contact", text: "Contact" }
                ].map(({ to, text }) => (
                  <Link
                    key={text}
                    to={to}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {text}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Newsletter
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400">
                Subscribe to our newsletter for updates and insights
              </p>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleNewsletterSubmit}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800/50 border-gray-700 focus:border-blue-500/30 h-12 text-white placeholder:text-gray-500"
                  aria-label="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button 
                  type="submit"
                  className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:shadow-lg transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              {message && (
                <p className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
              )}
              <p className="text-sm text-gray-500">
                By submitting, you agree to our{" "}
                <Link 
                  to="/privacy-policy" 
                  className="underline underline-offset-4 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            FCIT connect © All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with{" "}
            <span role="img" aria-label="heart" className="text-red-500 animate-pulse">
              ❤️
            </span>{" "}
            by FCIT
          </p>
        </div>
      </div>
    </footer>
  )
}