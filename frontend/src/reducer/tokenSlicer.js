import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: 'token',
    initialState : '',
    reducers: {
        slicer(state, action) {
            state = action.payload.slice(7)
            return state
        }
    }
})

export const {slicer} = tokenSlice.actions

export default tokenSlice.reducer