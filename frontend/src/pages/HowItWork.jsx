import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWork = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration & Login",
      description:
        "Join our platform to access exclusive auctions, post your own items for bidding, and manage your account. Both bidders and auctioneers must register or log in to take part in our seamless auction experience.",
    },
    {
      icon: <FaGavel />,
      title: "Choose Your Role",
      description:
        "Decide how you want to participate! Register as a 'Bidder' to place offers on exciting items or as an 'Auctioneer' to post your products for auction. Each role comes with unique features tailored to your needs.",
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Alerts",
      description:
        "When you win an auction, we'll send you a notification with the seller's payment information, covering options such as bank transfer, PayPal, or local payment methods like Upi.",
    },
    {
      icon: <FaDollarSign />,
      title: "Platform Commission",
      description:
        "After the Bidder completes their payment, Auctioneers are required to pay a 1% commission to the platform. Timely commission payments ensure uninterrupted posting of new items.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Submit Payment Proof",
      description:
        "Once payment is made, upload a screenshot of the transaction. After approval by the administrator, the Auctioneer’s commission balance will be updated accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Repost Unsold Items",
      description:
        "In case a winning Bidder does not complete the payment, Auctioneers can repost the unsold item at no additional cost, allowing another chance for a successful sale.",
    },
  ];
  return (
    <section className="w-full min-h-screen py-10 px-5 bg-gradient-to-b from-blue-50 to-white lg:pl-[320px]">
      <h1 className="text-[#1b5ff1] text-4xl font-extrabold mb-8 text-center min-[480px]:text-5xl md:text-6xl">
        Your Guide to Smart Bidding
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg transform transition hover:-translate-y-2 hover:shadow-xl p-6 group"
          >
            {/* Gradient Overlay (Behind the content) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center bg-[#1b5ff1] text-white text-3xl w-16 h-16 rounded-full mb-6 mx-auto transition-all duration-300 group-hover:bg-yellow-400">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 text-center mb-4 group-hover:text-[#1b5ff1] transition-all duration-300">
                {step.title}
              </h3>

              <p className="text-gray-600 text-center font-medium group-hover:text-gray-800 transition-all duration-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
