import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import "./App.css";
import Home from "./pages/Home";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Analytics/>
      <Navbar />
      <Router>
        <div className="font-primary">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/blog" element={<Blog />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} />
             <Route path="/services" element={<Services />} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
