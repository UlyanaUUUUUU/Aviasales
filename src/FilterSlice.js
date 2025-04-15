import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    all: false,
    transfers: {
        0: false,
        1: false,
        2: false,
        3: false,
    }
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        toggleAll(state) {
            const newValue = !state.all
            state.all = newValue
            for (let key in state.transfers) {
                state.transfers[key] = newValue
            }
        },

        toggleTransfer(state, action) {

            const key = action.payload

            if (state.transfers[key]) {    //убираем галочку при повторном нажатии
                state.transfers[key] = false
                state.all = false
                return
            }

            state.transfers[key] = true //если жмем на конкретную кнопку

            if (state.transfers[0] && state.transfers[1] && state.transfers[2] && state.transfers[3]) {
                state.all = true
                for (let key in state.transfers) {
                    state.transfers[key] = false
                }
                return
            }

            state.all = false //"всё" выключается
        }
    }
})

export const { toggleAll, toggleTransfer} = filtersSlice.actions;
export default filtersSlice.reducer;