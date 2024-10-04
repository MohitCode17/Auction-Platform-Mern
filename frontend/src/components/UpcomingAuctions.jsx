import React from "react";
import { useSelector } from "react-redux";
import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  // GETTING AUCTIONS WHICH START ON TODAY
  const today = new Date();
  const todayString = today.toDateString();

  const auctionStartingToday = allAuctions.filter((auction) => {
    const auctionDate = new Date(auction.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="my-8 sm:px-4">
      <h3 className="text-2xl font-semibold mb-8 text-center md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Auctions For Today
      </h3>

      {/* Conditional UI based on whether auctions exist for today */}
      {auctionStartingToday.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full p-4 gap-10 rounded-md flex flex-col justify-between text-white lg:flex-1 lg:h-auto lg:p-6 2xl:flex-none 2xl:basis-64 2xl:flex-grow 2xl:px-4 2xl:py-8 shadow-lg">
            <span className="rounded-full bg-yellow-400 text-white w-fit p-4">
              <RiAuctionFill size={24} />
            </span>
            <div>
              <h3 className="text-yellow-400 text-2xl font-semibold mb-4">
                Auctions For Today
              </h3>
              <p className="text-base">
                Stay updated with all the auctions happening today.
              </p>
            </div>
          </div>

          {/* Displaying auctions */}
          <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:flex-none 2xl:basis-64 2xl:flex-grow">
            {auctionStartingToday.slice(0, 2).map((element) => {
              return (
                <Link
                  to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10 object-cover"
                    />
                    <p className="font-normal text-[#111] text-[12px]">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 font-semibold">Starting Bid:</p>
                    <p className="text-blue-500 font-semibold">
                      Rs. {element.startingBid}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-600 font-bold">Starting Time:</p>
                    <p className="text-yellow-500 font-semibold text-[12px]">
                      {new Date(element.startTime).toDateString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
            {auctionStartingToday.slice(2, 4).map((element) => {
              return (
                <Link
                  to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10 object-cover"
                    />
                    <p className="font-normal text-[#111] text-[12px]">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 font-semibold">Starting Bid:</p>{" "}
                    <p className="text-blue-500 font-semibold">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-600 font-bold">Starting Time:</p>
                    <p className="text-yellow-500 font-semibold text-[12px]">
                      {new Date(element.startTime).toDateString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
            {auctionStartingToday.slice(4, 6).map((element) => {
              return (
                <Link
                  to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10 object-cover"
                    />
                    <p className="font-normal text-[#111] text-[12px]">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 font-semibold">Starting Bid:</p>{" "}
                    <p className="text-blue-500 font-semibold">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-600 font-bold">Starting Time:</p>
                    <p className="text-yellow-500 font-semibold text-[12px]">
                      {new Date(element.startTime).toDateString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        // UI when no auctions found for today
        <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 p-6 rounded-md shadow-md">
          <p className="text-gray-500 text-xl font-semibold">
            No auctions scheduled for today.
          </p>
          <p className="text-gray-400">
            Please check back later for upcoming auctions.
          </p>
        </div>
      )}
    </section>
  );
};

export default UpcomingAuctions;
