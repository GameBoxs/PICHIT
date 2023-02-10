import { createSlice } from "@reduxjs/toolkit";
import { testToken } from "../store/values";

export const tokenSlice = createSlice({
    name: 'token',
    // initialState : localStorage.getItem('token'),
    initialState : testToken,
    reducers: {
        slicer(state, action) {         //action 값을 받아서
            state = action.payload      //state에 저장 후
            return state                //반환
        }
    }
})

export const {slicer} = tokenSlice.actions

export default tokenSlice.reducer