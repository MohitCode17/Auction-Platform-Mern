import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  return (
    <section className="my-8 sm:px-4">
      <h3 className="text-2xl font-semibold mb-8 text-center md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Featured Auctions
      </h3>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allAuctions.slice(0, 8).map((element) => (
          <Card
            key={element._id}
            id={element._id}
            title={element.title}
            img={element.image?.url}
            startingBid={element.startingBid}
            startTime={element.startTime}
            endTime={element.endTime}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuctions;
