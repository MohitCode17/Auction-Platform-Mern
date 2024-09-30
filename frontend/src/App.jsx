import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideDrawer from "./layout/SideDrawer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";
import HowItWork from "./pages/HowItWork";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";

const App = () => {
  // FETCH USER PROFILE
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

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
        <Route path="/how-it-works" element={<HowItWork />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      {/* TOASTER */}
      <ToastContainer position="bottom-right" theme="colored" />
    </Router>
  );
};

export default App;
