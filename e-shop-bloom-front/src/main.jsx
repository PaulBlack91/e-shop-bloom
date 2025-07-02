import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Landing Page original */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Dashboard - Panel de cursos */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Curso individual */}
      <Route path="/course/:courseId" element={<CoursePage />} />
      
      {/* Fallback a landing page */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);
 