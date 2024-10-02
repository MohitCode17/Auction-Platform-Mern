import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiDollarCircle } from "react-icons/bi";
import { MdOutlineCelebration } from "react-icons/md";
import { RiForbid2Line } from "react-icons/ri";
import { RiAuctionLine } from "react-icons/ri";
import FeaturedAuctions from "@/components/FeaturedAuctions";
import UpcomingAuctions from "@/components/UpcomingAuctions";

const Home = () => {
  const howItWorks = [
    {
      title: "Discover Items",
      description: "Explore unique items to bid on.",
      icon: <RiAuctionLine />,
    },
    {
      title: "Place Your Bids",
      description: "Bid competitively to win.",
      icon: <RiForbid2Line />,
    },
    {
      title: "Win & Celebrate",
      description: "Top bidders are notified instantly.",
      icon: <MdOutlineCelebration />,
    },
    {
      title: "Secure Payment",
      description: "Complete payment securely, 1% fee applies.",
      icon: <BiDollarCircle />,
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gradient-to-b from-[#dbebf8] to-[#b0d5ec]">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[#4379F2] font-bold text-lg mb-4 tracking-wider uppercase">
            Your Path to Transparent Bidding
          </p>
          <h1 className="text-[#4379F2] text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-extrabold leading-tight mb-2">
            Open, Fair Auctions
          </h1>
          <h2 className="text-[#6d8fbc] text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-extrabold mb-8">
            Claim Your Win
          </h2>
          <div className="flex justify-center gap-4 mt-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#4379F2] to-[#285bba] hover:shadow-lg hover:from-[#396ace] hover:to-[#1b4aa0] font-semibold text-white py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300"
                >
                  Join Now
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-[#4379F2] text-[#4379F2] hover:bg-[#4379F2] hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 max-w-5xl mx-auto">
          <h3 className="text-[#4379F2] text-2xl font-bold mb-6 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((element, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-yellow-300 text-4xl mb-4 flex items-center justify-center">
                  {element.icon}
                </div>
                <h5 className="text-xl font-bold text-[#285bba] mb-2">
                  {element.title}
                </h5>
                <p className="text-gray-600">{element.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* FEATURED AUCTION SECTION */}
        <div className="mt-12">
          <FeaturedAuctions />
        </div>

        {/* UPCOMING AUCTION SECTION */}
        <div className="mt-12">
          <UpcomingAuctions />
        </div>
      </section>
    </>
  );
};

export default Home;
