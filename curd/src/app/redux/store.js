import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slice";

export const store = configureStore({
    reducer:{cart: cartReducer,}
})