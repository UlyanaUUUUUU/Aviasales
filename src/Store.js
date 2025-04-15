import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./FilterSlice.js"

export const store = configureStore({
    reducer: {
        filters: filtersReducer
    }
})