import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import SideDrawer from "./layout/SideDrawer";

const App = () => {
  return (
    <Router>
      {/* SIDEBAR */}
      <SideDrawer />
      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* TOASTER */}
      <ToastContainer position="bottom-right" />
    </Router>
  );
};

export default App;
