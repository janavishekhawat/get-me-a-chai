import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bio: "",
  upi: "",
  goalAmount: 0,
  totalReceived: 0,
  loading: false,
};

const profileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    setbio(state, action) {
      state.bio = action.payload;
    },
    setupi(state, action) {
      state.upi = action.payload;
    },
    setgoalAmount(state, action) {
      state.goalAmount = action.payload;
    },
    settotalReceived(state, action) {
      state.totalReceived = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setprofileImage,
  setbio,
  setupi,
  setgoalAmount,
  settotalReceived,
  setLoading,
} = profileSlice.actions;
export default profileSlice.reducer;
