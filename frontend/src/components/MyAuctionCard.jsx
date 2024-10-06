import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyAuctionCard = ({ img, title, startingBid, startTime, endTime, id }) => {
  const dispatch = useDispatch();

  // CALCULATE TIME STARTS OR END TO AN AUCTION
  const calculateTimeLeft = () => {
    const now = new Date();

    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;

    let timeLeft = {};
    // IF THE START TIME WILL BE A POSITIVE NUMBER, MEANING AUCTION HASN'T STARTED YET. WE CALCULATE THE TIME LEFT UNTIL IT STARTS.

    // IF START DIFFERENCE <= 0 AND ENDDIFFERENCE > 0, MEANING AUCTION HAS STARTED BUT HASN'T ENDED.
    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // SET TO INITIAL VALUE TO TIMELEFT TO STATE
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // THE TIME LEFT IS UPDATED EVERY SECOND USING USEEFFECT HOOK
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // HANDLE DELETE AUCTION
  const handleAuctionDelete = () => {
    dispatch(deleteAuction(id));
  };

  // DRAWER STATE
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 group">
        <img
          src={img}
          alt={title}
          className="w-full h-48 object-cover transition-transform transform group-hover:scale-110 duration-300"
        />
        <div className="p-4">
          <h5 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-sky-500 transition-colors duration-300">
            {title}
          </h5>
          {startingBid && (
            <p className="text-gray-600 text-sm">
              Starting Bid:{" "}
              <span className="text-yellow-500 font-bold">{startingBid}</span>
            </p>
          )}
          <p className="text-gray-600 text-sm mt-2">
            {timeLeft.type}{" "}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-yellow-500 font-semibold">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-red-500 font-semibold">Time's up!</span>
            )}
          </p>

          <div className="flex gap-2 mt-4 justify-between">
            <Link
              className="flex-1 text-white text-sm py-2 px-4 rounded-lg bg-sky-600 transition-all duration-300 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-center"
              to={`/auction/detail/${id}`}
            >
              View
            </Link>
            <button
              className="flex-1 text-white text-sm py-2 px-4 rounded-lg bg-red-500 transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              onClick={handleAuctionDelete}
            >
              Delete
            </button>
            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
              className={`flex-1 text-white text-sm py-2 px-4 rounded-lg ${
                new Date(endTime) > Date.now()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-800"
              } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
            >
              Republish
            </button>
          </div>
        </div>
      </div>
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default MyAuctionCard;

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);

  const handleRepublicAuction = () => {
    const formData = new FormData();

    formData.append("startTime", startTime);
    formData.append("endTime", endTime);

    dispatch(republishAuction(id, formData));
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition-opacity duration-500 ${
          openDrawer && id ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenDrawer(false)} // Close Drawer on clicking the backdrop
      />

      {/* Drawer */}
      <section
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ${
          openDrawer && id ? "translate-y-0" : "translate-y-full"
        } flex justify-center`}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl w-full sm:max-w-2xl mx-auto p-6 transition-all duration-500 ease-in-out">
          {/* Close Drawer Icon */}
          <button
            onClick={() => setOpenDrawer(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              Republish Auction
            </h3>
            <p className="text-gray-500 mb-6">
              Set new start and end times for the auction.
            </p>
          </div>

          <form className="flex flex-col gap-6">
            {/* Start Time */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <div className="w-full">
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  wrapperClassName="w-full" // Ensure the wrapper takes full width
                  popperClassName="w-full" // Optionally set the popper width
                />
              </div>
            </div>

            {/* End Time */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <div className="w-full">
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                  className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  wrapperClassName="w-full"
                  popperClassName="w-full"
                />
              </div>
            </div>

            {/* Republish Button */}
            <button
              type="button"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleRepublicAuction}
            >
              {loading ? "Please wait..." : "Republish Auction"}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
