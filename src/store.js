import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./utils/authSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});