import { configureStore } from "@reduxjs/toolkit";
import { climbsReducer } from "../features/climbs/climbsSlice";

export const store = configureStore({
    reducer: {
        climbs: climbsReducer
    }
})