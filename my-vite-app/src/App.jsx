import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import HelpLine from "./components/HelpLine.jsx";
import Dashboard from "./components/CustomerDashboard.jsx";

import { AuthContext } from "./AuthContext.jsx";


function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpline" element={<HelpLine />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
