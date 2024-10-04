import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <>
      <section className="my-8 lg:px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold text-center md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Top Bidders Leader Board
          </h3>
          <Link
            to={"/leaderboard"}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg px-5 py-2 rounded-md shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Go to Leaderboard
          </Link>
        </div>

        {/* Responsive table container */}
        <div className="overflow-x-auto w-full mt-5 rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-medium">#</th>
                <th className="py-3 px-6 text-left font-medium">Profile Pic</th>
                <th className="py-3 px-6 text-left font-medium">Username</th>
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
                    className={`border-b border-gray-300 hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } transition-all`}
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
      </section>
    </>
  );
};

export default LeaderBoard;
