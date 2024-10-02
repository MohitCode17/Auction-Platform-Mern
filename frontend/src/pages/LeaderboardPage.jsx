import Spinner from "@/components/Spinner";
import { useSelector } from "react-redux";

const LeaderboardPage = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <>
      <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen bg-gradient-to-b from-[#dbebf8] to-[#b0d5ec]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="mb-4">
              <h1 className="text-[#4379F2] text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-bold mb-6">
                Bidders Leaderboard
              </h1>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto w-full rounded-lg shadow-xl">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left font-medium">#</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Profile Pic
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Username
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Bid Expenditure
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Auctions Won
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {leaderboard.slice(0, 10).map((element, index) => {
                    return (
                      <tr
                        key={element._id}
                        className={`border-b border-gray-200 hover:bg-gray-50 transition-all ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="py-4 px-6 font-semibold text-xl text-gray-500">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6">
                          <img
                            src={element.profilePicture?.url}
                            alt={element.username}
                            className="h-12 w-12 object-cover rounded-full border-2 border-gray-200 shadow-md"
                          />
                        </td>
                        <td className="py-4 px-6 font-medium">
                          {element.username}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          ₹{element.moneySpent}
                        </td>
                        <td className="py-4 px-6 font-medium">
                          {element.auctionsWon}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default LeaderboardPage;
