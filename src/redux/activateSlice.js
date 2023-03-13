import { createSlice } from "@reduxjs/toolkit";

export const activateSlice = createSlice({
  name: "activate",

  initialState: {
    username: "",
    name: "",
    avatar: "",
  },

  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },

    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setUsername, setName, setAvatar } = activateSlice.actions;

export default activateSlice.reducer;
