import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state, action) {
      state.loading = true;
    },
    postCommissionProofSuccess(state, action) {
      state.loading = false;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
    },
  },
});

// BACKEND URL:-
const BACKEND_URL = "http://localhost:8000/api/v1/commission";

// POST COMMISSION PROOF REQUEST
export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());

  try {
    const res = await axios.post(`${BACKEND_URL}/proof`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(commissionSlice.actions.postCommissionProofSuccess());
    toast.success(res.data.message);
  } catch (error) {
    dispatch(commissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
  }
};

export default commissionSlice.reducer;
