import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentDetails: null,
  loading: false,
  success: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setpaymentDetails(state, action) {
      state.paymentDetails = action.payload;
    },
    setPaymentLoading(state, action) {
      state.loading = action.payload;
    },
    setPaymentError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setpaymentDetails, setPaymentLoading, setPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;