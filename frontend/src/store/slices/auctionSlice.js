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

export default auctionSlice.reducer;
