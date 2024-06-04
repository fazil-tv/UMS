import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

}

const userSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        logoutSuccess:(state)=>{
            state.currentUser = null;
            localStorage.removeItem('user');    
        }
    }
});

export const {signInSuccess,logoutSuccess} = userSlice.actions;

export default userSlice.reducer;   