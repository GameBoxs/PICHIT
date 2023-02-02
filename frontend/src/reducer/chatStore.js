import { createSlice } from "@reduxjs/toolkit";

export const chatSession = createSlice({
  name: "chatSession",
  initialState: "SessionA",
  reducers: {
    changeSession(state, sessionName) {
      return sessionName.payload;
    },
  },
});

export const { changeSession } = chatSession.actions;

export default chatSession.reducer;
