import {createSlice} from '@reduxjs/toolkit'

const initialState={
    pastOrders:[],
    trackOrders:[]
}
const orderSlice = createSlice({
    name:'order',
    initialState:initialState,
    reducers:{
        setPastOrders(state,action){
            state.pastOrders=action.payload.pastOrders
        },
        setTrackOrders(state,action){
            state.trackOrders=action.payload.trackOrders
        }
    }
})

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;