import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* HAMBURGER MENU */}
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#4379F2] text-white p-2 rounded-3xl text-2xl cursor-pointer hover:bg-[#1b5ff1] transition-colors duration-200 lg:hidden"
      >
        <GiHamburgerMenu />
      </div>

      {/* SIDE MENU */}
      <div
        className={`w-[100%] sm:w-[300px] h-full bg-[#dbebf8] fixed top-0 ${
          show ? "left-[0]" : "left-[-100%]"
        } transition-all duration-150 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-gray-400 z-[999]`}
      >
        <div className="relative">
          {/* LOGO */}
          <Link to={"/"}>
            <h4 className="text-2xl font-semibold mb-4">
              Bid<span className="text-[#1b5ff1]">Bazaar</span>
            </h4>
          </Link>
          {/* MENUS LIST */}
          <ul className="flex flex-col gap-1 lg:gap-3">
            <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
              <Link
                to={"/auctions"}
                className="flex items-center gap-2 font-semibold text-lg"
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>

            <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
              <Link
                to={"/leaderboard"}
                className="flex items-center gap-2 font-semibold text-lg"
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>

            {/* USER SHOULD AUTHENTICATE & MENU FOR AUCTIONEER */}
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
                  <Link
                    to={"/create-auction"}
                    className="flex items-center gap-2 font-semibold text-lg"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>

                <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
                  <Link
                    to={"/submit-commission"}
                    className="flex items-center gap-2 font-semibold text-lg"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>

                <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
                  <Link
                    to={"/view-my-auctions"}
                    className="flex items-center gap-2 font-semibold text-lg"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {/* USER SHOULD AUTHENTICATE & MENU FOR SUPER ADMIN */}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
                <Link
                  to={"/dashboard"}
                  className="flex items-center gap-2 font-semibold text-lg"
                >
                  <FaEye /> Dashboard
                </Link>
              </li>
            )}
          </ul>
          {/* AUTHETICATE OR NOT AUTHENTICATE ROUTE */}
          {!isAuthenticated ? (
            <>
              <div className="my-4 flex gap-2">
                <Link
                  to={"/register"}
                  className="bg-[#4379F2] font-semibold hover:bg-[#1b5ff1] text-base py-1 px-4 rounded-md text-white"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#4379F2] bg-transparent border-[#4379F2] border-2 hover:bg-[#4379F2] hover:text-white font-bold text-base py-1 px-4 rounded-md"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-4 w-fit" onClick={handleLogout}>
                <button className="bg-[#4379F2] hover:bg-[#1b5ff1] text-white px-4 py-1 rounded-md text-base">
                  Logout
                </button>
              </div>
            </>
          )}
          <hr className="border-t-blue-950/15 mb-2" />
          <ul className="flex flex-col gap-1 lg:gap-3">
            {isAuthenticated && (
              <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
                <Link
                  to={"/profile"}
                  className="flex items-center gap-2 font-semibold text-lg"
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
              <Link
                to={"/how-it-works"}
                className="flex items-center gap-2 font-semibold text-lg"
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>

            <li className="hover:bg-[#4379F2] hover:text-white p-1 rounded-sm transition-all duration-150">
              <Link
                to={"/about-us"}
                className="flex items-center gap-2 font-semibold text-lg"
              >
                <BsFillInfoSquareFill /> Know About Us
              </Link>
            </li>
          </ul>

          {/* CLOSE ICON */}
          <IoMdCloseCircleOutline
            className="absolute top-0 right-0 text-[28px] sm:hidden"
            onClick={() => setShow(!show)}
          />
        </div>

        {/* BOTTOM SECTION */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={"/"}
              className="bg-white/70 text-gray-500 p-2 text-xl rounded-sm hover:text-blue-700 transition-colors duration-150"
            >
              <FaFacebook />
            </Link>

            <Link
              to={"/"}
              className="bg-white/70 text-gray-500 p-2 text-xl rounded-sm hover:text-blue-700 transition-colors duration-150"
            >
              <RiInstagramFill />
            </Link>
          </div>
          <Link
            to={"/contact"}
            className="text-gray-500 font-semibold hover:text-[#1b5ff1] hover:transition-all hover:duration-150 text-sm"
          >
            Contact Us
          </Link>
          <p className="text-gray-500 text-sm">&copy; BidBazaar.in</p>
          <p className="text-gray-500 text-sm">
            Degined By{" "}
            <Link
              to={"https://github.com/MohitCode17"}
              target="_blank"
              className="font-semibold hover:text-[#1b5ff1] hover:transition-all hover:duration-150"
            >
              Mohit Gupta
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
