import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import Spinner from "@/components/Spinner";
import { placeBid } from "@/store/slices/bidSlice";

const ViewMyAuctionDetail = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigate("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full h-fit px-5 pt-16 lg:pl-[320px] flex flex-col">
      {/* Breadcrumb */}
      <div className="text-sm flex flex-wrap gap-2 items-center text-gray-500">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 hover:text-primary"
        >
          Home
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <Link
          to={"/auctions"}
          className="font-semibold transition-all duration-300 hover:text-primary"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <p className="text-gray-600">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-4 flex-col lg:flex-row mt-5">
          {/* Auction Information */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg p-6 rounded-lg">
              <div className="flex justify-center items-center p-5 bg-gray-100 rounded-lg">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="max-w-[200px] lg:max-w-[150px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-around">
                <h3 className="text-[#111] text-2xl font-semibold mb-2">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg font-semibold">
                  Condition:{" "}
                  <span className="text-primary">
                    {auctionDetail.condition}
                  </span>
                </p>
                <p className="text-lg font-semibold">
                  Minimum Bid:{" "}
                  <span className="text-primary">
                    ₹{auctionDetail.startingBid}
                  </span>
                </p>
              </div>
            </div>
            <p className="text-lg font-bold">Auction Description</p>
            <hr className="my-2 border-t-gray-300" />
            <p className="text-gray-600">{auctionDetail.description}</p>
          </div>

          {/* Bidders and Bid Section */}
          <div className="flex-1">
            <header className="bg-gray-200 py-4 text-2xl font-semibold px-4 rounded-t-lg">
              BIDS
            </header>
            <div className="bg-white px-6 py-4 rounded-lg shadow-lg min-h-[350px]">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="py-2 flex items-center justify-between"
                      >
                        <div className="flex flex-1 items-center gap-4">
                          <img
                            src={element.profilePicture}
                            alt={element.username}
                            className="w-12 h-12 rounded-full my-2 hidden md:block"
                          />
                          <p className="text-[18px] font-semibold">
                            {element.username}
                          </p>
                        </div>
                        <p className="flex-1 text-center">{element.amount}</p>
                        {index === 0 ? (
                          <p className="text-[20px] font-semibold text-green-600 flex-1 text-end">
                            1st
                          </p>
                        ) : index === 1 ? (
                          <p className="text-[20px] font-semibold text-blue-600 flex-1 text-end">
                            2nd
                          </p>
                        ) : index === 2 ? (
                          <p className="text-[20px] font-semibold text-yellow-600 flex-1 text-end">
                            3rd
                          </p>
                        ) : (
                          <p className="text-[20px] font-semibold text-gray-600 flex-1 text-end">
                            {index + 1}th
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No bids for this auction yet.
                  </p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <p className="text-center text-gray-500 py-4">
                  Auction has not started yet.
                </p>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Auction has ended.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewMyAuctionDetail;
