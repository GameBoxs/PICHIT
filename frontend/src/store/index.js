import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducer/tokenSlicer";
import roomReducer from "../reducer/roomStore"
import userStoreReducer from "../reducer/userStore"

export default configureStore({
    reducer: {
        token: tokenReducer,
        room : roomReducer,
        userinfo : userStoreReducer
    }
})