import Spinner from "@/components/Spinner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full h-fit px-5 pt-20 pb-10 lg:pl-[320px] flex flex-col min-h-screen bg-gradient-to-b from-[#dbebf8] to-[#b0d5ec]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="bg-white w-full max-w-3xl mx-auto p-6 shadow-lg rounded-lg">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={user?.profilePicture?.url}
                  alt="Profile Picture"
                  className="w-36 h-36 rounded-full border-4 border-blue-400 shadow-lg"
                />
                <h1 className="text-3xl mt-4 font-bold text-gray-800">
                  {user?.username}
                </h1>
                <p className="text-sm text-gray-500">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </p>
              </div>

              {/* Personal Details Section */}
              <div className="mb-8 w-full">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem label="Username" value={user?.username} />
                  <DetailItem label="Email" value={user?.email} />
                  <DetailItem label="Phone" value={user?.phone} />
                  <DetailItem label="Address" value={user?.address} />
                  <DetailItem label="Role" value={user?.role} />
                  <DetailItem
                    label="Joined On"
                    value={user?.createdAt?.substring(0, 10)}
                  />
                </div>
              </div>

              {user.role === "Auctioneer" && <PaymentDetails user={user} />}

              {/* Other User Details */}
              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Other User Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.role === "Auctioneer" && (
                    <DetailItem
                      label="Unpaid Commissions"
                      value={user.unpaidCommission}
                    />
                  )}
                  {user.role === "Bidder" && (
                    <>
                      <DetailItem
                        label="Auctions Won"
                        value={user.auctionsWon}
                      />
                      <DetailItem
                        label="Money Spent"
                        value={`₹${user.moneySpent}`}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      defaultValue={value}
      className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none"
      disabled
    />
  </div>
);

const PaymentDetails = ({ user }) => (
  <div className="mb-8 w-full">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">
      Payment Details
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem
        label="Bank Name"
        value={user?.paymentMethods?.bankTransfer?.bankName}
      />
      <DetailItem
        label="Bank Account"
        value={user?.paymentMethods?.bankTransfer?.bankAccountNumber}
      />
      <DetailItem
        label="Account Holder Name"
        value={user?.paymentMethods?.bankTransfer?.bankAccountName}
      />
      <DetailItem
        label="Paypal Id"
        value={user?.paymentMethods?.paypal?.paypalId}
      />
      <DetailItem label="UPI Id" value={user?.paymentMethods?.upiId?.upiId} />
    </div>
  </div>
);

export default Profile;
