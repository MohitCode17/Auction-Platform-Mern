import MyAuctionCard from "@/components/MyAuctionCard";
import Spinner from "@/components/Spinner";
import { getMyAuctions } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuction = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigate("/");
    }
    dispatch(getMyAuctions());
  }, [isAuthenticated, dispatch]);  

  return (
    <>
      <div className="w-full h-fit px-5 py-10 lg:pl-[320px] flex flex-col">
        <h1
          className={`text-[#4379F2] text-2xl font-bold mb-8 min-[480px]:text-4xl md:text-6xl xl:text-7xl`}
        >
          My Auctions
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-8">
            {myAuctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {myAuctions.map((element) => {
                  return (
                    <MyAuctionCard
                      title={element.title}
                      startingBid={element.startingBid}
                      endTime={element.endTime}
                      startTime={element.startTime}
                      img={element.image?.url}
                      id={element._id}
                      key={element._id}
                    />
                  );
                })}
              </div>
            ) : (
              <h3 className="text-gray-500/50 text-lg font-semibold mb-2">
                You have not posted any auction.
              </h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewMyAuction;
