import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import activate from "./activateSlice";

export default configureStore({
  reducer: {
    auth,
    activate,
  },
});
