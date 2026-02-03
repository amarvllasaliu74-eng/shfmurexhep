import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import StudentOfMonth from "@/pages/StudentOfMonth";
import TopStudents from "@/pages/TopStudents";
import Activities from "@/pages/Activities";
import Tournaments from "@/pages/Tournaments";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import LiveTV from "@/pages/LiveTV";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nxenesi-i-muajit" element={<StudentOfMonth />} />
          <Route path="/nxenesit-me-te-mire" element={<TopStudents />} />
          <Route path="/aktivitetet" element={<Activities />} />
          <Route path="/turniret" element={<Tournaments />} />
          <Route path="/rreth" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/live" element={<LiveTV />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;