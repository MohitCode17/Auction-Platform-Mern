import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ img, title, startingBid, startTime, endTime, id }) => {
  // CALCULATE TIME STARTS OR END TO AN AUCTION
  const calculateTimeLeft = () => {
    // GET CURRENT TIME
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

  return (
    <Link
      to={`/auction/item/${id}`}
      className="flex flex-col bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200 ease-in-out"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h5 className="font-semibold text-lg text-blue-600 mb-2">{title}</h5>
        {startingBid && (
          <p className="text-gray-600 font-light mb-1">
            Starting Bid: <span className="text-blue-500 font-bold">{startingBid}</span>
          </p>
        )}
        <p className="text-gray-600 font-light">
          {timeLeft.type}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="text-yellow-400 font-bold ml-1">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="text-yellow-400 font-bold ml-1">Time's up!</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default Card;
