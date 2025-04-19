import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./FilterSlice.js"
import ticketsReducer from "./FetchData.js"

export const index = configureStore({
    reducer: {
        filters: filtersReducer,
        tickets: ticketsReducer
    },
})