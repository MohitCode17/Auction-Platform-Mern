import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideDrawer from "./layout/SideDrawer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SubmitCommission from "./pages/SubmitCommission";
import HowItWork from "./pages/HowItWork";
import About from "./pages/About";
import { useDispatch } from "react-redux";
import { fetchLeaderboard, fetchUser } from "./store/slices/userSlice";
import { getAllAuctions } from "./store/slices/auctionSlice";
import LeaderboardPage from "./pages/LeaderboardPage";
import Auctions from "./pages/Auctions";
import AuctionDetail from "./pages/AuctionDetail";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuction from "./pages/ViewMyAuction";
import ViewMyAuctionDetail from "./pages/ViewMyAuctionDetail";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // FETCH USER PROFILE
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctions());
    dispatch(fetchLeaderboard());
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
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/view-my-auctions" element={<ViewMyAuction />} />
        <Route path="/auction/detail/:id" element={<ViewMyAuctionDetail />} />
        <Route path="/auction/item/:id" element={<AuctionDetail />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* TOASTER */}
      <ToastContainer position="bottom-right" theme="colored" />
    </Router>
  );
};

export default App;
