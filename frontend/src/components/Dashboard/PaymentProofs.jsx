import {
  deletePaymentProof,
  getSinglePaymentProof,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProof(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">User ID</th>
              <th className="w-1/3 py-2">Status</th>
              <th className="w-1/3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 text-center">{element.userId}</td>
                    <td className="py-2 px-4 text-center">{element.status}</td>
                    <td className="flex items-center py-4 justify-center gap-3">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                        onClick={() => handleFetchPaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                        onClick={() => handlePaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center text-lg text-gray-500 py-3">
                <td>No payment proofs are found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );

  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  // Update state when singlePaymentProof changes
  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "");
    }
  }, [singlePaymentProof]);

  const handleUpdatePaymentProof = () => {
    dispatch(updatePaymentProof(singlePaymentProof?._id, status, amount));
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition-opacity duration-500 ${
          openDrawer && singlePaymentProof.userId
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenDrawer(false)}
      />

      {/* Drawer */}
      <section
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ${
          openDrawer && singlePaymentProof.userId
            ? "translate-y-0"
            : "translate-y-full"
        } flex justify-center`}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl w-full sm:max-w-2xl mx-auto p-6 max-h-[80vh] overflow-y-auto">
          {/* Close Drawer Icon */}
          <button
            onClick={() => setOpenDrawer(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
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

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-600">
              Update Payment Proof
            </h3>
            <p className="text-gray-500">
              You can update payment status and amount.
            </p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-gray-600">User ID</label>
              <input
                type="text"
                value={singlePaymentProof.userId || ""}
                disabled
                className="text-xl px-1 py-2 bg-transparent border border-gray-400 text-gray-400 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-gray-600">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl px-1 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-gray-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-xl px-1 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-gray-600">Comment</label>
              <textarea
                rows={5}
                value={singlePaymentProof.comment || ""}
                disabled
                className="text-xl px-1 py-2 bg-transparent border border-gray-400 text-gray-400  rounded-md focus:outline-none"
              />
            </div>
            <div>
              <Link
                to={singlePaymentProof.proof?.url || ""}
                className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl hover:bg-yellow-600 transition duration-300"
                target="_blank"
              >
                Payment Proof (SS)
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="bg-blue-500 w-full py-2 rounded-md text-white font-semibold text-xl hover:bg-blue-600 transition duration-300"
                onClick={handleUpdatePaymentProof}
              >
                {loading ? "Please wait..." : "Update Payment Proof"}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="bg-orange-500 w-full py-2 rounded-md text-white font-semibold text-xl hover:bg-orange-600 transition duration-300"
                onClick={() => setOpenDrawer(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
