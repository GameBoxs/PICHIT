import { configureStore, createSlice } from "@reduxjs/toolkit";

let chatSession = createSlice({
    name : 'chatSession',
    initialState : 'SessionA',
    reducers : {
        changeSession(state,sessionName) {
            return sessionName.payload
        }
    }
})

export default configureStore({
    reducer:{
        chatSession : chatSession.reducer
    }
})