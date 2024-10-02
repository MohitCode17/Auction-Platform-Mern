import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { loading, allAuctions } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="w-full h-fit px-5 pt-20 mb-10 lg:pl-[320px] flex flex-col">
          {/* Page Title */}
          <section className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2 mb-8">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4379F2] to-[#6d8fbc] text-3xl font-bold mb-4 min-[480px]:text-4xl md:text-6xl xl:text-7xl">
              Discover Unique & Exciting Auctions
            </h1>
          </section>

          {/* Auction Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allAuctions.map((element) => (
              <Card
                title={element.title}
                startTime={element.startTime}
                endTime={element.endTime}
                img={element.image?.url}
                startingBid={element.startingBid}
                id={element._id}
                key={element._id}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Auctions;
