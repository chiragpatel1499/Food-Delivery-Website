import {createSlice} from '@reduxjs/toolkit';

const initialState={
    restaurants:[],
    topRestaurants:[],
    filterRestaurants:[]
}

const restaurantSlice = createSlice({
    name:'restaurants',
    initialState:initialState,
    reducers:{
        setRestaurants(state,action){
            state.restaurants=action.payload.restaurants;
        },
        setTopRestaurants(state,action){
            state.topRestaurants=action.payload.topRestaurants;
        },
        setFilterRestaurants(state,action){
            state.filterRestaurants=action.payload.filterRestaurants
        }
    }
})


export const restaurantsActions=restaurantSlice.actions
export default restaurantSlice.reducer