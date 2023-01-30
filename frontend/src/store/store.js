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

const tokenStore = createSlice({
    name: 'tokenStore',
    initialState: {
        value: ''
    },
    reducers: {
        tokenStore(state) {
            console.log(state)
            return state.slice(7)
        }
    }
})

export default configureStore({
    reducer:{
        chatSession : chatSession.reducer,
        tokenStore: tokenStore.reducer
    }
})