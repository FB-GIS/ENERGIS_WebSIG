import {createSlice} from "@reduxjs/toolkit"


//Initial state of the user in the Redux store
const initialState = {
    infos: {},
    isLogged: false // Is not connected
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        connectUser: (state, action) => {
            state.infos = action.payload //Store the user information (firstname, lastname, email, address, city, phone...etc.)
            state.isLogged = true
        },
        logoutUser: (state) => {
            state.infos = {} //We empty the information
            state.isLogged = false
        }
    }
})

export const {connectUser, logoutUser} = userSlice.actions
export const selectUser = (state) => state.user
export default userSlice.reducer