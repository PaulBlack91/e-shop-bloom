import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Checkout from "./components/Checkout.jsx";
import CoursePage from "./course/presentation/pages/CoursePage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/course" element={<CoursePage />} />
      <Route path="/course/:moduleId" element={<CoursePage />} />
      <Route path="/course/:moduleId/:lessonId" element={<CoursePage />} />
    </Routes>
  </BrowserRouter>
);