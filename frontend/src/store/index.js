import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducer/tokenSlicer";
import chatSessionReducer from "../reducer/chatStore"
import userStoreReducer from "../reducer/userStore"

export default configureStore({
    reducer: {
        token: tokenReducer,
        chatSession : chatSessionReducer,
        userinfo : userStoreReducer
    }
})