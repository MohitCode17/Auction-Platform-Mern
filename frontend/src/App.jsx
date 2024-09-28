import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import SideDrawer from "./layout/SideDrawer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";

const App = () => {
  return (
    <Router>
      {/* SIDEBAR */}
      <SideDrawer />
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit-commission" element={<SubmitCommission />} />
      </Routes>
      {/* TOASTER */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
};

export default App;
