import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"

//Configure application's main Redux store.
const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store