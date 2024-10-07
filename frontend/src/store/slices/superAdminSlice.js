import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllAuctions } from "./auctionSlice";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },

  reducers: {
    montlyRevenueRequest(state, action) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    montlyRevenueSuccess(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    montlyRevenueFailed(state, action) {
      state.loading = false;
      state.monthlyRevenue = [];
    },
    fatchUsersRequest(state, action) {
      state.loading = true;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    fatchUsersSuccess(state, action) {
      state.loading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    fatchUsersFailed(state, action) {
      state.loading = false;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    fatchPaymentProofRequest(state, action) {
      state.loading = true;
      state.paymentProofs = [];
    },
    fatchPaymentProofSuccess(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload.paymentProofs;
    },
    fatchPaymentProofFailed(state, action) {
      state.loading = false;
      state.paymentProofs = [];
    },
    deletePaymentProofRequest(state, action) {
      state.loading = true;
    },
    deletePaymentProofSuccess(state, action) {
      state.loading = false;
    },
    deletePaymentProofFailed(state, action) {
      state.loading = false;
    },
    fatchSinglePaymentProofRequest(state, action) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    fatchSinglePaymentProofSuccess(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload.paymentProofDetail;
    },
    fatchSinglePaymentProofFailed(state, action) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
    updatePaymentProofRequest(state, action) {
      state.loading = true;
    },
    updatePaymentProofSuccess(state, action) {
      state.loading = false;
    },
    updatePaymentProofFailed(state, action) {
      state.loading = false;
    },
    deleteAuctionRequest(state, action) {
      state.loading = true;
    },
    deleteAuctionSuccess(state, action) {
      state.loading = false;
    },
    deleteAuctionFailed(state, action) {
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.loading = false;
      state.monthlyRevenue = state.monthlyRevenue;
      state.paymentProofs = state.paymentProofs;
      state.totalAuctioneers = state.totalAuctioneers;
      state.totalBidders = state.totalBidders;
      state.singlePaymentProof = {};
    },
  },
});

// BACKEND URL:-
const BACKEND_URL = "http://localhost:8000/api/v1/superadmin";

// REQUEST FOR GET MONTHLY REVENUE
export const getMontlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.montlyRevenueRequest());

  try {
    const res = await axios.get(`${BACKEND_URL}/monthlyincome`, {
      withCredentials: true,
    });

    dispatch(
      superAdminSlice.actions.montlyRevenueSuccess(res.data.totalMonthlyRevenue)
    );
  } catch (error) {
    dispatch(
      superAdminSlice.actions.montlyRevenueFailed(error.response.data.message)
    );
  }
};

// REQUEST FOR GET ALL AUCTIONEERS & BIDDERS
export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.fatchUsersRequest());

  try {
    const res = await axios.get(`${BACKEND_URL}/users/getall`, {
      withCredentials: true,
    });

    dispatch(superAdminSlice.actions.fatchUsersSuccess(res.data));
  } catch (error) {
    dispatch(
      superAdminSlice.actions.fatchUsersFailed(error.response.data.message)
    );
  }
};

// REQUEST FOR GET ALL PAYMENT PROOF
export const getPaymentProofs = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.fatchPaymentProofRequest());

  try {
    const res = await axios.get(`${BACKEND_URL}/paymentproofs/getAll`, {
      withCredentials: true,
    });

    dispatch(superAdminSlice.actions.fatchPaymentProofSuccess(res.data));
  } catch (error) {
    dispatch(
      superAdminSlice.actions.fatchPaymentProofFailed(
        error.response.data.message
      )
    );
  }
};

// REQUEST FOR DELETE PAYMENT PROOF
export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.deletePaymentProofRequest());

  try {
    const res = await axios.delete(`${BACKEND_URL}/paymentproof/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(superAdminSlice.actions.deletePaymentProofSuccess());
    dispatch(getPaymentProofs());
    toast.success(res.data.message);
  } catch (error) {
    dispatch(
      superAdminSlice.actions.deletePaymentProofFailed(
        error.response.data.message
      )
    );
    toast.error(error.response.data.message);
  }
};

// REQUEST FOR FETCH SINGLE PAYMENT PROOF
export const getSinglePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.fatchSinglePaymentProofFailed());

  try {
    const res = await axios.get(`${BACKEND_URL}/paymentproofs/${id}`, {
      withCredentials: true,
    });

    dispatch(superAdminSlice.actions.fatchSinglePaymentProofSuccess(res.data));
  } catch (error) {
    dispatch(
      superAdminSlice.actions.fatchSinglePaymentProofFailed(
        error.response.data.message
      )
    );
  }
};

// REQUEST FOR FETCH SINGLE PAYMENT PROOF
export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(superAdminSlice.actions.updatePaymentProofRequest());

  try {
    const res = await axios.put(
      `${BACKEND_URL}/paymentproof/status/update/${id}`,
      { status, amount },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(superAdminSlice.actions.updatePaymentProofSuccess());
    toast.success(res.data.message);
    dispatch(superAdminSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      superAdminSlice.actions.updatePaymentProofFailed(
        error.response.data.message
      )
    );
    toast.error(error.response.data.message);
  }
};

// REQUEST DELETE AUCTION
export const deleteAuction = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.deleteAuctionRequest());

  try {
    const res = await axios.delete(`${BACKEND_URL}/auction/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(superAdminSlice.actions.deleteAuctionSuccess());
    toast.success(res.data.message);
    dispatch(getAllAuctions());
  } catch (error) {
    dispatch(superAdminSlice.actions.deleteAuctionFailed());
    toast.error(error.response.data.message);
  }
};

export const clearAllSuperAdminSliceErrors = () => (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;
