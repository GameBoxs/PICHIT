import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducer/tokenSlicer";
import chatSessionReducer from "../reducer/chatStore"

export default configureStore({
    reducer: {
        token: tokenReducer,
        chatSession : chatSessionReducer
    }
})