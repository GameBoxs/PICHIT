import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: "",
    email: "",
  },
  reducers: {
    setUserInfo(state, action) {
        state = {...action.payload?.data}
        return state
    }
  }
});

export const {setUserInfo} = userStore.actions

export default userStore.reducer