import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {},
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action)=>{
            if(action.payload){
                state.currentUser = {...action.payload};
            }
            else{
                localStorage.clear()
                state.currentUser = {};
            }
        }
    }
})

export const {setUser} = userSlice.actions;

export const getUser = (state) => state.user.currentUser;

export default userSlice.reducer;