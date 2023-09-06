import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username:'',
    role:'',
    isLogged:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        storeAuth(state,action){
            return action.payload;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;