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
      console.log('룸 리덕스 변경 감지',action.payload);
      state = action?.payload
      return state
    },
  },
});

export const { changeRoom } = roomStore.actions;

export default roomStore.reducer;
