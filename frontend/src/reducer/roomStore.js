import { createSlice } from "@reduxjs/toolkit";

export const roomStore = createSlice({
  name: "room",
  initialState: {
    userInfo: null,
    roomId: null,
    isHost: null
  },
  reducers: {
    changeRoom(state, action) {
      state = action?.payload
      return state
    },
  },
});

export const { changeRoom } = roomStore.actions;

export default roomStore.reducer;
