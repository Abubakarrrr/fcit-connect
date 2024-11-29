import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import SignUp from "./components/Forms/SignUp";
import Login from "./components/Forms/Login";
import Footer from "./components/shared/Footer";

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
