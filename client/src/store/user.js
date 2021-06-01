import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isAuthenticated:false,
    profile:{},
    role:null,
    deliveryExecutive:null
}

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true
            state.profile=action.payload.profile
            state.deliveryExecutive=action.payload.deliveryExecutive
            state.role=action.payload.role
        },
        logout(state,action){
            state.isAuthenticated=false
            state.profile={}
            state.role=null
            state.deliveryExecutive=null
        },
        updateProfile(state,action){
            const profile={...state.profile,...action.payload.profile}
            state.profile=profile
            if(state.role=='DE'){
                state.deliveryExecutive=action.payload.deliveryExecutive
            }
        },
        setUser(state,action){
            state.profile=action.payload.profile;
            state.isAuthenticated=action.payload.isAuthenticated;
            state.deliveryExecutive=action.payload.deliveryExecutive;
            state.role=action.payload.role;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;