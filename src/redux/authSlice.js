import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuth: false,
    user: null,
    otp: {
      phone: "",
      hash: "",
    },
  },

  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuth = !user ? false : true;
    },

    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
