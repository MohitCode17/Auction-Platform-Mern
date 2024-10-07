import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const { loading } = useSelector((state) => state.commission);
  const dispatch = useDispatch();

  // HANDLE PROOF
  const handleProof = (e) => {
    const file = e.target.files?.[0];
    setProof(file);
  };

  // HANDLE PAYMENT PROOF
  const handlePaymentProof = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);

    // DISPATCH REQUEST
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-gray-100">
      <div className="bg-white shadow-lg mx-auto w-full max-w-3xl p-6 flex flex-col gap-6 items-center py-6 justify-center rounded-lg">
        {/* PAYMENT PROOF FORM */}
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handlePaymentProof}
        >
          <h3 className="text-[#1b5ff1] text-2xl font-semibold mb-4 md:text-3xl lg:text-4xl text-center">
            Upload Payment Proof
          </h3>
          
          {/* Amount Input */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm lg:text-base">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-[16px] py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter amount"
            />
          </div>

          {/* File Upload Input */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm lg:text-base">
              Payment Proof (Image/Screenshot)
            </label>
            <input
              type="file"
              onChange={handleProof}
              className="text-[16px] py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              accept="image/*"
            />
          </div>

          {/* Comment Textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm lg:text-base">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-[16px] py-2 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              rows={6}
              placeholder="Add any comments (optional)"
            />
          </div>

          {/* Submit Button */}
          <button
            className={`${
              loading ? "bg-gray-400" : "bg-[#4379F2] hover:bg-[#1b5ff1]"
            } w-full font-semibold text-lg py-3 px-4 rounded-md text-white transition-all duration-150`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
