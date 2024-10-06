import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuctions: [],
    allAuctions: [],
  },

  reducers: {
    getAllAuctionItemRequest(state, action) {
      state.loading = true;
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAllAuctionItemFailed(state, action) {
      state.loading = false;
    },
    getAllAuctionDetailRequest(state, action) {
      state.loading = true;
    },
    getAllAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.auction;
      state.auctionBidders = action.payload.bidders;
    },
    getAllAuctionDetailFailed(state, action) {
      state.loading = false;
      state.auctionDetail = state.auctionDetail;
      state.auctionBidders = state.auctionBidders;
    },
    getMyAuctionsRequest(state, action) {
      state.loading = true;
      state.myAuctions = [];
    },
    getMyAuctionsSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload.myAuctions;
    },
    getMyAuctionsFailed(state, action) {
      state.loading = false;
      state.myAuctions = [];
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
    republishAuctionRequest(state, action) {
      state.loading = true;
    },
    republishAuctionSuccess(state, action) {
      state.loading = false;
    },
    republicAuctionFailed(state, action) {
      state.loading = false;
    },
    createAuctionRequest(state, action) {
      state.loading = false;
    },
    createAuctionSuccess(state, action) {
      state.loading = false;
    },
    createAuctionFailed(state, action) {
      state.loading = false;
    },
    resetSlice(state, action) {
      state.loading = false;
      state.auctionDetail = state.auctionDetail;
      state.itemDetail = state.itemDetail;
      state.myAuctions = state.myAuctions;
      state.allAuctions = state.allAuctions;
    },
  },
});

// BACKEND URL:-
const BACKEND_URL = "http://localhost:8000/api/v1/auction";

// REQUEST TO GET ALL AUCTIONS
export const getAllAuctions = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());

  try {
    const res = await axios.get(`${BACKEND_URL}/allAuctions`, {
      withCredentials: true,
    });

    dispatch(auctionSlice.actions.getAllAuctionItemSuccess(res.data.auctions));
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.getAllAuctionItemFailed());
    dispatch(auctionSlice.actions.resetSlice());
  }
};

// REQUEST TO GET AUCTION BY ID
export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionDetailRequest());

  try {
    const res = await axios.get(`${BACKEND_URL}/detail/${id}`, {
      withCredentials: true,
    });

    dispatch(auctionSlice.actions.getAllAuctionDetailSuccess(res.data));
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.getAllAuctionDetailFailed());
    dispatch(auctionSlice.actions.resetSlice());
  }
};

// REQUEST TO GET MY AUCTIONS
export const getMyAuctions = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionsRequest());

  try {
    const res = await axios.get(`${BACKEND_URL}/myAuction`, {
      withCredentials: true,
    });
    dispatch(auctionSlice.actions.getMyAuctionsSuccess(res.data));
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
    dispatch(auctionSlice.actions.resetSlice());
  }
};

// REQUEST TO DELETE MY AUCTION
export const deleteAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionRequest());

  try {
    const res = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(auctionSlice.actions.deleteAuctionSuccess());
    toast.success(res.data.message);
    dispatch(getAllAuctions());
    dispatch(getMyAuctions());
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.deleteAuctionFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

// REQUEST TO GET MY AUCTIONS
export const republishAuction = (id, data) => async (dispatch) => {
  dispatch(auctionSlice.actions.republishAuctionRequest());

  try {
    const res = await axios.put(`${BACKEND_URL}/republish/${id}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(auctionSlice.actions.republishAuctionSuccess());
    toast.success(res.data.message);
    dispatch(getAllAuctions());
    dispatch(getMyAuctions());
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.republicAuctionFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

// REQUEST TO CREATE AUCTION
export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());

  try {
    const res = await axios.post(`${BACKEND_URL}/create`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(auctionSlice.actions.createAuctionSuccess());
    toast.success(res.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.createAuctionFailed());
    toast.success(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

export default auctionSlice.reducer;
