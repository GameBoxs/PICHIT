import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: "",
    email: "",
  },
  reducers: {
    getUserInfo(state, action) {
        state = {...action.payload?.data}
        return state
    }
  }
});

export const {getUserInfo} = userStore.actions

export default userStore.reducer