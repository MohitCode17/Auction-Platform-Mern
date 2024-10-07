import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { createAuction } from "@/store/slices/auctionSlice";

const auctionCategories = [
  "Antiques & Collectibles",
  "Art & Paintings",
  "Jewelry & Watches",
  "Luxury Goods",
  "Furniture & Home Decor",
  "Vintage & Retro Items",
  "Electronics & Gadgets",
  "Vehicles & Automobiles",
  "Sports Memorabilia",
  "Fashion & Apparel",
  "Books & Manuscripts",
  "Musical Instruments",
  "Real Estate & Properties",
  "Coins & Currency",
  "Toys & Games",
  "Rare Wines & Spirits",
  "Photography & Cameras",
  "Stamps & Postal History",
  "Handmade Crafts",
  "Industrial & Machinery",
];

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // HANDLE IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  // HANDLE CREATE AUCTION
  const handleCreateAuction = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("image", image);

    // DISPATCH THE REQUEST
    dispatch(createAuction(formData));
  };

  // NAVIGATE TO HOME IF USER IS NOT AN AUCTIONEER OR NOT AUTHENTICATED
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full px-4 py-10 lg:py-20 lg:px-16 lg:pl-[320px] flex flex-col items-center">
      <h1 className="text-[#4379F2] text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 text-center">
        Create Auction
      </h1>
      <div className="bg-white shadow-md w-full max-w-3xl rounded-lg p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleCreateAuction}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <label className="text-lg text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter auction title"
              />
            </div>
            <div className="flex-1">
              <label className="text-lg text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <label className="text-lg text-gray-700">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-lg text-gray-700">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter starting bid"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-lg text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter auction description"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1">
              <label className="text-lg text-gray-700">
                Auction Starting Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
                wrapperClassName="w-full"
                popperClassName="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="text-lg text-gray-700">Auction End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="border rounded-md px-3 py-2 w-full mt-1 focus:ring-2 focus:ring-blue-500"
                wrapperClassName="w-full"
                popperClassName="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-lg text-gray-700 font-semibold">
              Auction Item Image
            </label>
            <div className="flex flex-col items-center justify-center w-full mt-2">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 focus:bg-gray-200 transition-all"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt={title} className="w-44 h-auto" />
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-2 text-gray-500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG, or JPG (Max 2MB)
                    </p>
                  </>
                )}
              </label>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImage}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 rounded-md bg-[#4379F2] hover:bg-[#365ec9] text-white font-semibold w-full transition-all"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Auction"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAuction;
