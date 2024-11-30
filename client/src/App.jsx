import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import SignUp from "./components/Forms/SignUp";
import Login from "./components/Forms/Login";
import Footer from "./components/shared/Footer";
import EmailVerify from "./components/Forms/EmailVerify";
import ForgotPassowrd from "./components/Forms/ForgotPassowrd";
import ResetPassword from "./components/Forms/ResetPassword";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Analytics/> */}
      <Router>
        <div className="font-primary">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/forgot-password" element={<ForgotPassowrd  />} />
            <Route path="/reset-password" element={<ResetPassword  />} />
            {/* <Route path="/signup" element={<Home />} /> */}
            {/* <Route path="/blog" element={<Blog />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} />
             <Route path="/services" element={<Services />} /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
