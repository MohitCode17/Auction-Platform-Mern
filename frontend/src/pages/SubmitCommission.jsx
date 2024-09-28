import React, { useState } from "react";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  // HANDLE PROOF
  const handleProof = (e) => {
    const file = e.target.files?.[0];
    setProof(file);
  };

  const [loading, setLoading] = useState(false);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    console.log("Payment proof submitted.");
  };

  return (
    <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        {/* PAYMENT PROOF FORM */}
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handlePaymentProof}
        >
          <h3 className="text-[#1b5ff1] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Upload Payment Proof
          </h3>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 font-semibold">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 font-semibold">
              Payment Proof (Image/Screenshot)
            </label>
            <input
              type="file"
              onChange={handleProof}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-gray-800 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-500 font-semibold">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-[16px] py-2 bg-transparent border-[1px] rounded-md px-1 border-gray-500 focus:outline-none resize-none"
              rows={6}
            />
          </div>
          <button
            className="bg-[#4379F2] w-full font-semibold hover:bg-[#1b5ff1] transition-all duration-150 text-lg py-2 px-4 rounded-md text-white mx-auto my-4"
            type="submit"
            disabled={loading}
          >
            {loading && "Loading..."}
            {!loading && "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
