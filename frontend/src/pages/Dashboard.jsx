import {
  clearAllSuperAdminSliceErrors,
  getAllUsers,
  getMontlyRevenue,
  getPaymentProofs,
} from "@/store/slices/superAdminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import PaymentGraph from "@/components/Dashboard/PaymentGraph";
import AuctionItemDelete from "@/components/Dashboard/AuctionItemDelete";
import PaymentProofs from "@/components/Dashboard/PaymentProofs";
import BiddersAuctioneersGraph from "@/components/Dashboard/BiddersAuctioneersGraph";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.superAdmin);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMontlyRevenue());
    dispatch(getAllUsers());
    dispatch(getPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Super Admin") {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col gap-10">
            <h1
              className={`text-[#4379F2] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl`}
            >
              Dashboard
            </h1>
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="text-[#111] text-lg font-semibold mb-3 sm:mb-10 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Total Monthly Payments Received
                </h3>
                <PaymentGraph />
              </div>
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-3 sm:mb-10 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Total Users
                </h3>
                <BiddersAuctioneersGraph />
              </div>
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Payment Proofs
                </h3>
                <PaymentProofs />
              </div>
              <div>
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Delete Auctions
                </h3>
                <AuctionItemDelete />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
